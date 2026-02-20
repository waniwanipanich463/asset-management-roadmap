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
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
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
                            className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                        >
                            {val / 10000}万円
                        </button>
                    ))}
                </div>
                <input
                    type="number"
                    value={input.initialAsset}
                    onChange={(e) => update('initialAsset', Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                />
                <input
                    type="range"
                    min="0" max="50000000" step="100000"
                    value={input.initialAsset}
                    onChange={(e) => update('initialAsset', Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* 毎月積立 */}
            <div className="space-y-3">
                <label className="text-sm text-zinc-400 font-medium">毎月積立（円）</label>
                <input
                    type="number"
                    value={input.monthlyInvestment}
                    onChange={(e) => update('monthlyInvestment', Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                />
                <input
                    type="range"
                    min="0" max="1000000" step="5000"
                    value={input.monthlyInvestment}
                    onChange={(e) => update('monthlyInvestment', Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* 運用期間 */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm text-zinc-400 font-medium">運用期間（年）</label>
                    <span className="text-sm font-bold text-blue-400">{input.years}年</span>
                </div>
                <input
                    type="range"
                    min="1" max="50" step="1"
                    value={input.years}
                    onChange={(e) => update('years', Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* 想定年利 */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm text-zinc-400 font-medium">想定年利（%）</label>
                    <span className="text-sm font-bold text-blue-400">{input.annualReturn}%</span>
                </div>
                <input
                    type="range"
                    min="0" max="20" step="0.1"
                    value={input.annualReturn}
                    onChange={(e) => update('annualReturn', Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
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
                            className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                        >
                            {val / 100000000 >= 1 ? `${val / 100000000}億円` : `${val / 10000}万円`}
                        </button>
                    ))}
                </div>
                <input
                    type="number"
                    value={input.targetAsset}
                    onChange={(e) => update('targetAsset', Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                />
            </div>
        </div>
    );
}
