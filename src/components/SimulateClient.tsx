"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { calculateForward, SimulationInput } from "@/utils/simulation";
import InputForm from "./InputForm";
import Results from "./Results";
import YouTubePopup from "./YouTubePopup";
import mbtiData from "@/data/mbti.json";

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

    useEffect(() => {
        if (initialMbti && mbtiData.some(d => d.type === initialMbti)) {
            setMbti(initialMbti);
        }
    }, [initialMbti]);

    const result = useMemo(() => calculateForward(input), [input]);

    return (
        <div className="flex flex-col gap-12 md:gap-16 pb-12 md:pb-20">
            <header className="w-full relative">
                <h1 className="sr-only">つむぎの資産運用シミュレーション</h1>
                {/* 画面端まで広がるヒーローイラスト */}
                <div className="w-full">
                    <Image
                        src="/hero-illustration.png"
                        alt="つむぎの資産運用シミュレーション"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-auto object-cover drop-shadow-2xl"
                        unoptimized
                    />
                </div>

                {/* コピー＆CTAボタン (既存の幅制限を適用) */}
                <div className="max-w-6xl mx-auto px-4 text-center mt-8 md:mt-12">
                    <p className="text-gray-700 text-lg md:text-xl font-bold tracking-tight mb-8">
                        まずは現実を知る。そして、未来をデザインする。
                    </p>
                    <div className="flex flex-col items-center gap-6 w-full z-20 relative">
                        {/* サービス詳細LPへのリンク */}
                        <a 
                            href="https://tumugi-lp.vercel.app" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center w-[90%] max-w-[500px] h-[72px] rounded-full overflow-hidden bg-gradient-to-r from-accent-teal to-[#4ade80] p-[2.5px] transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(45,212,191,0.4)]"
                            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                        >
                            <div className="flex items-center justify-center w-full h-full bg-white rounded-full transition-all duration-500 group-hover:bg-transparent px-8">
                                <span className="text-accent-teal group-hover:text-white font-black text-lg md:text-xl transition-colors tracking-wider">
                                    つむぎのサービス詳細を見る
                                </span>
                                <div className="ml-3 w-6 h-6 flex items-center justify-center rounded-full bg-accent-teal group-hover:bg-white text-white group-hover:text-accent-teal transition-all duration-500 shadow-sm">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* 既存の診断サイトへの戻りボタン */}
                        <a href="https://toushi-shindan.vercel.app/"
                            className="group relative block w-[90%] max-w-[500px] transition-transform duration-500 hover:scale-[1.03] active:scale-95 cursor-pointer"
                            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                            {/* デフォルト画像 (通常時表示) */}
                            <Image
                                src="/cta-button-off.png"
                                alt="投資診断サイトへ戻る"
                                width={1000}
                                height={250}
                                className="w-full h-auto drop-shadow-xl absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                unoptimized
                            />
                            {/* ホバー時画像 (ホバー時のみ表示) */}
                            <Image
                                src="/cta-button-on.png"
                                alt="投資診断サイトへ戻る"
                                width={1000}
                                height={250}
                                className="w-full h-auto drop-shadow-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 relative"
                                unoptimized
                            />
                        </a>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-4 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/30 p-8 md:p-10 shadow-xl relative lg:sticky lg:top-8 z-10 glass-card">
                        <InputForm input={input} onChange={setInput} />
                    </div>
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <Results input={input} result={result} mbti={mbti} />
                    </div>
                </div>
            </div>

            <YouTubePopup />
        </div>
    );
}
