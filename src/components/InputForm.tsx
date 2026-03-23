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
        <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                <span className="w-1.5 h-8 bg-cp-fuchsia shadow-[0_0_10px_var(--cp-fuchsia)] inline-block"></span>
                System_Input
            </h2>

            {/* 初期資産 */}
            <div className="space-y-4">
                <label className="text-xs text-zinc-500 font-black uppercase tracking-widest">Initial_Capital (JPY)</label>
                <div className="flex gap-2">
                    {[1000000, 5000000, 10000000].map(val => (
                        <button
                            key={val}
                            onClick={() => update('initialAsset', val)}
                            className="flex-1 py-2 text-[10px] font-black rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-cp-fuchsia hover:text-cp-fuchsia hover:shadow-[0_0_8px_var(--cp-fuchsia)] transition-all uppercase tracking-tighter"
                        >
                            {val / 10000}万円
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="number"
                        value={input.initialAsset}
                        onChange={(e) => update('initialAsset', Number(e.target.value))}
                        className="w-full bg-black/60 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-cp-fuchsia focus:shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all font-mono text-xl tracking-tighter"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 uppercase">Val_JPY</div>
                </div>
                <input
                    type="range"
                    min="0" max="50000000" step="100000"
                    value={input.initialAsset}
                    onChange={(e) => update('initialAsset', Number(e.target.value))}
                    className="w-full h-1 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-cp-fuchsia"
                />
            </div>

            {/* 毎月積立 */}
            <div className="space-y-4">
                <label className="text-xs text-zinc-500 font-black uppercase tracking-widest">Monthly_Contribution (JPY)</label>
                <div className="relative">
                    <input
                        type="number"
                        value={input.monthlyInvestment}
                        onChange={(e) => update('monthlyInvestment', Number(e.target.value))}
                        className="w-full bg-black/60 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-cp-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all font-mono text-xl tracking-tighter"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 uppercase">Val_JPY</div>
                </div>
                <input
                    type="range"
                    min="0" max="1000000" step="5000"
                    value={input.monthlyInvestment}
                    onChange={(e) => update('monthlyInvestment', Number(e.target.value))}
                    className="w-full h-1 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-cp-cyan"
                />
            </div>

            {/* 運用期間 */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <label className="text-xs text-zinc-500 font-black uppercase tracking-widest">Time_Horizon</label>
                    <span className="text-xl font-black text-cp-yellow neon-text-yellow px-2 bg-cp-yellow/10">{input.years} YEARS</span>
                </div>
                <input
                    type="range"
                    min="1" max="50" step="1"
                    value={input.years}
                    onChange={(e) => update('years', Number(e.target.value))}
                    className="w-full h-1 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-cp-yellow"
                />
            </div>

            {/* 想定年利 */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <label className="text-xs text-zinc-500 font-black uppercase tracking-widest">Annual_Yield</label>
                    <span className="text-xl font-black text-cp-cyan neon-text-cyan px-2 bg-cp-cyan/10">{input.annualReturn}%</span>
                </div>
                <input
                    type="range"
                    min="0" max="20" step="0.1"
                    value={input.annualReturn}
                    onChange={(e) => update('annualReturn', Number(e.target.value))}
                    className="w-full h-1 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-cp-cyan"
                />
            </div>

            {/* 目標資産 */}
            <div className="space-y-4 pt-10 border-t border-zinc-900 mt-2 relative">
                <div className="absolute -top-[1px] left-0 w-8 h-[1px] bg-cp-cyan" />
                <label className="text-xs text-zinc-500 font-black uppercase tracking-widest">Target_Objective (JPY)</label>
                <div className="flex gap-2">
                    {[50000000, 100000000, 200000000].map(val => (
                        <button
                            key={val}
                            onClick={() => update('targetAsset', val)}
                            className="flex-1 py-2 text-[10px] font-black rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-cp-cyan hover:text-cp-cyan hover:shadow-[0_0_8px_var(--cp-cyan)] transition-all uppercase tracking-tighter"
                        >
                            {val / 100000000 >= 1 ? `${val / 100000000}億円` : `${val / 10000}万円`}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="number"
                        value={input.targetAsset}
                        onChange={(e) => update('targetAsset', Number(e.target.value))}
                        className="w-full bg-black/60 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-cp-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all font-mono text-xl tracking-tighter"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600 uppercase">OBJ_SET</div>
                </div>
            </div>
        </div>
    );
}
