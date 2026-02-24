"use client";

import { useState, useMemo, useEffect } from "react";
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
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-16">
            <header className="text-center space-y-4 max-w-3xl mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground pb-2 px-6 whitespace-nowrap leading-tight overflow-visible inline-block font-noto">
                    つむぎの資産運用シミュレーション
                </h1>
                <p className="text-gray-500 text-lg md:text-xl font-bold tracking-tight">
                    まずは現実を知る。そして、未来をデザインする。
                </p>
                <div className="flex justify-center pt-4">
                    <a href="https://toushi-shindan.vercel.app/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent-teal transition-all bg-white hover:bg-white px-5 py-2.5 rounded-full font-bold border border-gray-100 hover:border-accent-teal/20 shadow-sm backdrop-blur-sm">
                        ← 投資診断サイトへ戻る
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/30 p-8 md:p-10 shadow-xl relative lg:sticky lg:top-8 z-10 glass-card">
                    <InputForm input={input} onChange={setInput} />
                </div>
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <Results input={input} result={result} mbti={mbti} />
                </div>
            </div>

            <YouTubePopup />
        </div>
    );
}
