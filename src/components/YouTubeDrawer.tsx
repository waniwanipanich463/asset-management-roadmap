"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Youtube, ChevronLeft } from "lucide-react";

export default function YouTubeDrawer() {
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

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`; // No autoplay in drawer normally
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <>
            {/* Drawer Trigger Button (Fixed to Right Edge) */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center gap-2 px-1 py-12 bg-black border-y-2 border-l-2 border-cp-cyan shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all overflow-hidden ${isOpen ? "translate-x-full" : "translate-x-0"}`}
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                whileHover={{ backgroundColor: "rgba(0, 255, 255, 0.1)" }}
            >
                <ChevronLeft className="w-5 h-5 text-cp-cyan animate-pulse" />
                <div className="[writing-mode:vertical-rl] text-white text-[10px] font-black tracking-[0.2em] font-mono leading-none flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-600 rotate-90" />
                    <span>LATEST VIDEO</span>
                </div>
            </motion.button>

            {/* Sidebar Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop (Darken the rest of the site) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-[2px]"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-[120] w-[90%] md:w-[450px] bg-black/90 glass-card-cp border-l-4 border-cp-cyan shadow-[-10px_0_30px_rgba(0,0,0,0.8)] p-6 flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-cp-cyan" />
                                    <h4 className="text-white font-black uppercase tracking-widest text-lg">新着動画をチェック</h4>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-cp-cyan/20 text-zinc-500 hover:text-cp-cyan transition-all rounded-full"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Video Container */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="space-y-6">
                                    <div className="aspect-video relative bg-zinc-900 border border-zinc-800 shadow-inner group overflow-hidden">
                                        <iframe
                                            src={embedUrl}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full relative z-10"
                                        ></iframe>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />
                                    </div>
                                    
                                    <div className="bg-zinc-950 p-6 border-l-2 border-cp-fuchsia">
                                        <p className="text-[10px] font-mono text-zinc-600 mb-2 uppercase tracking-widest">Description</p>
                                        <p className="text-zinc-400 text-sm leading-relaxed font-bold">
                                            つむぎ部屋の最新資産運用ロードマップ動画を公開中。この動画を見れば、より具体的な運用イメージを掴むことができます。
                                        </p>
                                    </div>

                                    <a 
                                        href={`https://www.youtube.com/watch?v=${videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                    >
                                        <Youtube className="w-5 h-5" />
                                        <span>YouTubeで直接見る</span>
                                    </a>
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col gap-4">
                                <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest text-center">
                                    © 2026 つむぎ部屋 // GLOBAL BROADCAST SYSTEM
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
