"use client";

import { SimulationInput } from "@/utils/simulation";

export default function InputForm({
    input,
    onChange
}: {
    input: SimulationInput,
    onChange: (v: SimulationInput) => void
}) {
    const update = (key: keyof SimulationInput, val: number) => {
        onChange({ ...input, [key]: val });
    };

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="w-2 h-8 bg-accent-teal rounded-full inline-block"></span>
                シミュレーション設定
            </h2>

            {/* 初期資産 */}
            <div className="space-y-3">
                <label className="text-sm text-zinc-400 font-medium">初期資産（円）</label>
                <div className="flex gap-2 mb-2">
                    {[1000000, 5000000, 10000000].map(val => (
                        <button
                            key={val}
                            onClick={() => update('initialAsset', val)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-white border border-gray-200 text-foreground hover:border-accent-teal hover:text-accent-teal transition-all shadow-sm"
                        >
                            {val / 10000}万円
                        </button>
                    ))}
                </div>
                <input
                    type="number"
                    value={input.initialAsset}
                    onChange={(e) => update('initialAsset', Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 transition-all font-mono text-lg shadow-sm"
                />
                <input
                    type="range"
                    min="0" max="50000000" step="100000"
                    value={input.initialAsset}
                    onChange={(e) => update('initialAsset', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-teal"
                />
            </div>

            {/* 毎月積立 */}
            <div className="space-y-3">
                <label className="text-sm text-zinc-400 font-medium">毎月積立（円）</label>
                <input
                    type="number"
                    value={input.monthlyInvestment}
                    onChange={(e) => update('monthlyInvestment', Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 transition-all font-mono text-lg shadow-sm"
                />
                <input
                    type="range"
                    min="0" max="1000000" step="5000"
                    value={input.monthlyInvestment}
                    onChange={(e) => update('monthlyInvestment', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-teal"
                />
            </div>

            {/* 運用期間 */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm text-gray-500 font-medium">運用期間（年）</label>
                    <span className="text-sm font-bold text-accent-teal">{input.years}年</span>
                </div>
                <input
                    type="range"
                    min="1" max="50" step="1"
                    value={input.years}
                    onChange={(e) => update('years', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-teal"
                />
            </div>

            {/* 想定年利 */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm text-gray-500 font-medium">想定年利（%）</label>
                    <span className="text-sm font-bold text-accent-teal">{input.annualReturn}%</span>
                </div>
                <input
                    type="range"
                    min="0" max="20" step="0.1"
                    value={input.annualReturn}
                    onChange={(e) => update('annualReturn', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-teal"
                />
            </div>

            {/* 目標資産 */}
            <div className="space-y-3 pt-6 border-t border-zinc-800 mt-2">
                <label className="text-sm text-zinc-400 font-medium">目標資産（円） ※逆算シミュレーション用</label>
                <div className="flex gap-2 mb-2">
                    {[50000000, 100000000, 200000000].map(val => (
                        <button
                            key={val}
                            onClick={() => update('targetAsset', val)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-white border border-gray-200 text-foreground hover:border-accent-teal hover:text-accent-teal transition-all shadow-sm"
                        >
                            {val / 100000000 >= 1 ? `${val / 100000000}億円` : `${val / 10000}万円`}
                        </button>
                    ))}
                </div>
                <input
                    type="number"
                    value={input.targetAsset}
                    onChange={(e) => update('targetAsset', Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-teal/50 transition-all font-mono text-lg shadow-sm"
                />
            </div>
        </div>
    );
}
