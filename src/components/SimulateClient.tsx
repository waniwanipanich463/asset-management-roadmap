"use client";

import { useState, useMemo, useEffect } from "react";
import { calculateForward, SimulationInput } from "@/utils/simulation";
import InputForm from "./InputForm";
import Results from "./Results";
import mbtiData from "@/data/mbti.json";

export default function SimulateClient({
    initialMbti,
    initialTargetAsset,
    initialAssetAmount
}: {
    initialMbti?: string,
    initialTargetAsset?: string,
    initialAssetAmount?: string
}) {
    const defaultInitialAsset = initialAssetAmount && !isNaN(Number(initialAssetAmount)) ? Number(initialAssetAmount) : 1000000;
    const defaultTargetAsset = initialTargetAsset && !isNaN(Number(initialTargetAsset)) ? Number(initialTargetAsset) : 100000000;

    const [input, setInput] = useState<SimulationInput>({
        initialAsset: defaultInitialAsset,
        monthlyInvestment: 50000,
        years: 20,
        annualReturn: 5,
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
            <header className="text-center space-y-6 max-w-2xl mx-auto px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent pb-2 whitespace-nowrap">
                    資産運用ロードマップ
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl font-medium">
                    まずは現実を知る。そして、未来をデザインする。
                </p>
                <div className="flex justify-center pt-2">
                    <a href="https://toushi-shindan.vercel.app/" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors bg-zinc-800/80 hover:bg-zinc-700 px-5 py-2.5 rounded-full font-medium border border-zinc-700/50 shadow-sm backdrop-blur-sm">
                        ← 投資診断サイトへ戻る
                    </a>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-6 md:p-8 shadow-2xl relative lg:sticky lg:top-8 z-10">
                    <InputForm input={input} onChange={setInput} />
                </div>
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <Results input={input} result={result} mbti={mbti} />
                </div>
            </div>
        </div>
    );
}
