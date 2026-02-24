import { NextResponse } from "next/server";

export async function GET() {
    const CHANNEL_ID = "UC2VfIGmIV_2FSB7r0fIkbKg";
    const LATEST_VIDEO_FALLBACK = "rynNb92MaK0"; // Latest as of 2026-02-24
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    try {
        const response = await fetch(RSS_URL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.warn("YouTube RSS fetch failed with status:", response.status);
            return NextResponse.json({ videoId: LATEST_VIDEO_FALLBACK, isFallback: true });
        }

        const xml = await response.text();
        const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const videoId = videoIdMatch ? videoIdMatch[1] : LATEST_VIDEO_FALLBACK;

        return NextResponse.json({ videoId, isFallback: !videoIdMatch });
    } catch (error) {
        console.error("YouTube Fetch Error:", error);
        return NextResponse.json({ videoId: LATEST_VIDEO_FALLBACK, isFallback: true });
    }
}
