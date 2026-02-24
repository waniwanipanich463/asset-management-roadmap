"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Youtube } from "lucide-react";

export default function YouTubePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [videoId, setVideoId] = useState("MwK7VcSjl4A"); // Fallback ID

    useEffect(() => {
        const fetchLatestVideo = async () => {
            try {
                const res = await fetch("/api/video-id");
                const data = await res.json();
                if (data.videoId) {
                    setVideoId(data.videoId);
                }
            } catch (error) {
                console.error("Failed to fetch latest video:", error);
            }
        };
        fetchLatestVideo();
    }, []);

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <>
            {/* Floating Action Button (Thumbnail Preview) */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[100] w-40 md:w-56 aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 group flex items-center justify-center"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Thumbnail Image */}
                <img
                    src={thumbnailUrl}
                    alt="YouTube Video Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* Overlay with Glow */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                {/* New Video Banner */}
                <div className="absolute top-0 left-0 w-full bg-red-600/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold py-1 md:py-1.5 text-center z-20 shadow-sm tracking-wider">
                    新着動画をチェック
                </div>

                {/* Play Icon Overlay */}
                <div className="relative z-10 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors">
                    <Play className="w-6 h-6 fill-current text-white ml-1" />
                </div>

                {/* Youtube Label Animation */}
                <div className="absolute bottom-2 right-2 z-10 p-1 bg-black/60 rounded px-2 text-[10px] font-bold text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    WATCH ON YOUTUBE
                </div>
            </motion.button>

            {/* Popup Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Header (Optional Info) */}
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/10">
                                <Youtube className="w-4 h-4 text-red-500" />
                                <span>YouTube 動画を再生中</span>
                            </div>

                            {/* Video Iframe */}
                            <iframe
                                src={embedUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
