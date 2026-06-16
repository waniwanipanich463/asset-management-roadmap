import { NextResponse } from "next/server";

const CHANNEL_ID = "UC2VfIGmIV_2FSB7r0fIkbKg";
const LATEST_VIDEO_FALLBACK = "R8lAylnhtqI"; // Latest as of 2026-06-16

async function fetchLatestVideoByScraping(channelId: string): Promise<string | null> {
    const url = `https://www.youtube.com/channel/${channelId}/videos`;
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });
        if (!response.ok) {
            console.warn("YouTube scrape fetch failed with status:", response.status);
            return null;
        }
        const html = await response.text();
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
        let match;
        const videoIds: string[] = [];
        while ((match = regex.exec(html)) !== null) {
            const id = match[1];
            if (!videoIds.includes(id)) {
                videoIds.push(id);
            }
            if (videoIds.length >= 5) break;
        }
        return videoIds.length > 0 ? videoIds[0] : null;
    } catch (error) {
        console.error("YouTube Scrape Error:", error);
        return null;
    }
}

export async function GET() {
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    try {
        // Try RSS first
        const response = await fetch(RSS_URL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (response.ok) {
            const xml = await response.text();
            const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
            if (videoIdMatch) {
                return NextResponse.json({ videoId: videoIdMatch[1], isFallback: false });
            }
        }

        console.warn("YouTube RSS fetch failed or parsing failed, trying scraping fallback...");
    } catch (error) {
        console.warn("YouTube RSS Fetch Error, trying scraping fallback...", error);
    }

    // Fallback: try scraping HTML
    const scrapedVideoId = await fetchLatestVideoByScraping(CHANNEL_ID);
    if (scrapedVideoId) {
        return NextResponse.json({ videoId: scrapedVideoId, isFallback: false, source: "scraping" });
    }

    // Last resort fallback
    return NextResponse.json({ videoId: LATEST_VIDEO_FALLBACK, isFallback: true });
}
