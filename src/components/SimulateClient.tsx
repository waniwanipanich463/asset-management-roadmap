"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { calculateForward, SimulationInput } from "@/utils/simulation";
import InputForm from "./InputForm";
import Results from "./Results";
import YouTubePopup from "./YouTubePopup";
import mbtiData from "@/data/mbti.json";

const bgImages = ["/haikei01.png", "/haikei02.png", "/haikei03.png", "/haikei04.png"];

export default function SimulateClient({
    initialMbti,
    initialTargetAsset,
    initialAssetAmount,
    initialMonthlyInvestment,
    initialYears,
    initialAnnualReturn
}: {
    initialMbti?: string,
    initialTargetAsset?: string,
    initialAssetAmount?: string,
    initialMonthlyInvestment?: string,
    initialYears?: string,
    initialAnnualReturn?: string
}) {
    const defaultInitialAsset = initialAssetAmount && !isNaN(Number(initialAssetAmount)) ? Number(initialAssetAmount) : 1000000;
    const defaultTargetAsset = initialTargetAsset && !isNaN(Number(initialTargetAsset)) ? Number(initialTargetAsset) : 100000000;
    const defaultMonthlyInvestment = initialMonthlyInvestment && !isNaN(Number(initialMonthlyInvestment)) ? Number(initialMonthlyInvestment) : 50000;
    const defaultYears = initialYears && !isNaN(Number(initialYears)) ? Number(initialYears) : 20;
    const defaultAnnualReturn = initialAnnualReturn && !isNaN(Number(initialAnnualReturn)) ? Number(initialAnnualReturn) : 5;

    const [input, setInput] = useState<SimulationInput>({
        initialAsset: defaultInitialAsset,
        monthlyInvestment: defaultMonthlyInvestment,
        years: defaultYears,
        annualReturn: defaultAnnualReturn,
        targetAsset: defaultTargetAsset,
    });

    const [mbti, setMbti] = useState<string | undefined>(initialMbti);
    const [currentBgIndex, setCurrentBgIndex] = useState(0);

    useEffect(() => {
        if (initialMbti && mbtiData.some(d => d.type === initialMbti)) {
            setMbti(initialMbti);
        }
    }, [initialMbti]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const result = useMemo(() => calculateForward(input), [input]);

    return (
        <div className="flex flex-col gap-12 md:gap-20 pb-12 md:pb-24 scanlines min-h-screen">
            <header className="w-full relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
                <h1 className="sr-only">つむぎの資産運用シミュレーション</h1>

                {/* 背景スライドショー */}
                <div className="absolute inset-0 z-0">
                    {bgImages.map((src, index) => (
                        <div 
                            key={src}
                            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentBgIndex ? "opacity-100" : "opacity-0"}`}
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover"
                                priority={index === 0}
                                unoptimized
                            />
                        </div>
                    ))}
                    {/* グラデーションオーバーレイ */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
                    <div className="absolute inset-0 bg-black/30 z-10" />
                </div>

                {/* タイトルロゴ (背景の上に重ねる) */}
                <div className="relative z-20 w-[85%] max-w-[600px] animate-glitch">
                    <Image 
                        src="/title.png" 
                        alt="つむぎの資産運用シミュレーション" 
                        width={1200} 
                        height={600} 
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </header>

            {/* コピー＆CTAボタン (スライドショーの下に配置) */}
            <div className="max-w-6xl mx-auto px-4 text-center mt-[-40px] mb-16 relative z-30 w-full">
                <p className="text-white text-xl md:text-3xl font-black tracking-tighter mb-10 uppercase neon-text-fuchsia italic drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                    まずは現実を知る。そして、未来をデザインする。
                </p>
                <div className="flex flex-col items-center gap-8 w-full">
                    {/* サービス詳細LPへのリンク */}
                    <a 
                        href="https://tumugi-lp.vercel.app" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-[90%] max-w-[500px] h-[72px] bg-black border-2 border-cp-cyan overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                    >
                        <div className="absolute inset-0 bg-cp-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="flex items-center justify-center relative z-10 px-8">
                            <span className="text-cp-cyan group-hover:text-black font-black text-lg md:text-xl transition-colors tracking-widest uppercase">
                                プロジェクトの詳細を見る
                            </span>
                            <div className="ml-4 w-6 h-6 flex items-center justify-center bg-cp-cyan group-hover:bg-black text-black group-hover:text-cp-cyan transition-all duration-300">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </a>

                    {/* 既存の診断サイトへの戻りボタン */}
                    <a 
                        href="https://toushi-shindan.vercel.app/"
                        className="group relative flex items-center justify-center w-[90%] max-w-[500px] h-[72px] bg-black border-2 border-cp-fuchsia overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                    >
                        <div className="absolute inset-0 bg-cp-fuchsia translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="flex items-center justify-center relative z-10 px-8">
                            <span className="text-cp-fuchsia group-hover:text-black font-black text-lg md:text-xl transition-colors tracking-widest uppercase">
                                投資診断をやり直す
                            </span>
                            <div className="ml-4 w-6 h-6 flex items-center justify-center bg-cp-fuchsia group-hover:bg-black text-black group-hover:text-cp-fuchsia transition-all duration-300 transform rotate-180">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    <div className="lg:col-span-4 glass-card-cp p-8 md:p-10 shadow-2xl relative lg:sticky lg:top-8 z-10 border-t-2 border-cp-fuchsia/40">
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cp-fuchsia" />
                        <InputForm input={input} onChange={setInput} />
                    </div>
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <Results input={input} result={result} mbti={mbti} />
                    </div>
                </div>
            </div>

            <YouTubePopup />
        </div>
    );
}
