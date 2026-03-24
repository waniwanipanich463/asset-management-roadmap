"use client";

import { useMemo } from "react";
import { SimulationInput, SimulationResult, calculateRequiredMonthly } from "@/utils/simulation";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, AlertCircle, Clock, ShieldCheck } from "lucide-react";
import mbtiData from "@/data/mbti.json";
import phasesData from "@/data/phases.json";
import eventsData from "@/data/events.json";

export default function Results({
    input,
    result,
    mbti
}: {
    input: SimulationInput,
    result: SimulationResult,
    mbti?: string
}) {
    const mbtiProfile = mbti ? mbtiData.find(d => d.type === mbti) : null;
    const currentPhase = phasesData.find(p => result.finalAmount >= p.minAsset && result.finalAmount < p.maxAsset) || phasesData[phasesData.length - 1];
    const requiredMonthly = useMemo(() => calculateRequiredMonthly(input.targetAsset, input.initialAsset, input.years, input.annualReturn), [input]);
    const isTargetReached = result.finalAmount >= input.targetAsset;

    // Custom Tooltip for Recharts
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/80 border border-cp-cyan backdrop-blur-md p-4 rounded-none shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                    <p className="text-zinc-500 mb-2 font-mono text-[10px] uppercase">{`運用期間: ${label} 年`}</p>
                    <p className="text-cp-cyan font-black text-lg mb-1">{`資産合計: ${Math.floor(payload[0].value / 10000).toLocaleString()}万円`}</p>
                    <p className="text-zinc-600 text-[10px] font-mono uppercase hidden sm:block">{`元本合計: ${Math.floor(payload[0].payload.principal / 10000).toLocaleString()}万円`}</p>
                </div>
            );
        }
        return null;
    };

    const formatYAxis = (tickItem: number) => {
        return `${Math.floor(tickItem / 10000)}万`;
    };

    // 10年単位のデータ抽出
    const decadesData = result.yearlyData.filter(d => d.year % 10 === 0 && d.year > 0);

    // イベント（表示用にランダムに1つ選択、または10年ごとに紐づけする簡易実装として）
    const displayedEvents = decadesData.map((d, idx) => {
        return {
            year: d.year,
            event: eventsData[idx % eventsData.length]
        };
    });

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="glass-card-cp rounded-none border-l-4 border-cp-fuchsia p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-cp-fuchsia">
                        <TrendingUp size={80} />
                    </div>
                    <p className="text-cp-fuchsia font-black text-[10px] mb-2 uppercase tracking-[0.2em] neon-text-fuchsia">期待運用結果 ({input.years}年)</p>
                    <p className="text-4xl lg:text-5xl font-black text-white font-sans tracking-tighter mt-2 whitespace-nowrap">
                        {Math.floor(result.finalAmount / 10000).toLocaleString()} <span className="text-xl text-zinc-500 font-sans font-medium uppercase">万円</span>
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-4">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">投資元本</p>
                        <p className="text-sm font-bold text-zinc-300 font-mono tracking-tighter">¥{Math.floor((input.initialAsset + input.monthlyInvestment * 12 * input.years) / 10000).toLocaleString()}万円</p>
                    </div>
                </div>

                <div className={`glass-card-cp rounded-none border-r-4 ${isTargetReached ? 'border-cp-cyan' : 'border-cp-yellow'} p-8 relative overflow-hidden group`}>
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Target size={80} className={isTargetReached ? "text-cp-cyan" : "text-cp-yellow"} />
                    </div>
                    <p className={`font-black text-[10px] mb-2 uppercase tracking-[0.2em] ${isTargetReached ? 'text-cp-cyan neon-text-cyan' : 'text-cp-yellow neon-text-yellow'}`}>目標達成状況</p>
                    {isTargetReached ? (
                        <div className="mt-2 text-cp-cyan">
                            <p className="text-3xl font-black uppercase tracking-tighter mb-2">
                                達成まで {result.targetReachYear}年
                            </p>
                            <p className="text-xs text-zinc-400 leading-relaxed font-bold uppercase tracking-wide">順調な資産形成。このまま継続しましょう。</p>
                        </div>
                    ) : (
                        <div className="mt-2 text-cp-yellow">
                            <p className="text-3xl font-black uppercase tracking-tighter mb-2">
                                目標未達成
                            </p>
                            <div className="mt-4 bg-cp-yellow/5 border-l-2 border-cp-yellow p-4 text-[10px] flex flex-col gap-2 font-mono uppercase">
                                <span className="flex items-center gap-1.5 text-cp-yellow font-black"><AlertCircle size={14} /> システム提案</span>
                                <span className="text-zinc-300 leading-relaxed">目標達成には毎月あと <strong className="text-cp-yellow text-sm">¥{Math.ceil(requiredMonthly / 1000).toLocaleString()}千円</strong> の積み増しが必要です。</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Chart */}
            <div className="glass-card-cp rounded-none border border-zinc-900 p-6 md:p-8 bg-black/40 relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cp-cyan/20" />
                <h3 className="text-sm font-black text-white mb-8 flex items-center gap-2 uppercase tracking-[0.3em]">
                    <span className="w-1.5 h-6 bg-cp-cyan shadow-[0_0_8px_var(--cp-cyan)] inline-block"></span>
                    資産推移予測
                </h3>
                <div className="h-72 sm:h-80 w-full ml-[-20px] sm:ml-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={result.yearlyData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#FF00FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                            <XAxis dataKey="year" stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} tickMargin={10} minTickGap={20} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} tickFormatter={formatYAxis} width={60} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area yAxisId="left" type="monotone" dataKey="amount" stroke="#00FFFF" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 6, strokeWidth: 0, fill: '#00FFFF' }} />
                            <Area yAxisId="left" type="monotone" dataKey="principal" stroke="#FF00FF" strokeWidth={1} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPrincipal)" activeDot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 10 Year Table & Events */}
            <div className="glass-card-cp rounded-none border border-zinc-900 p-8">
                <h3 className="text-sm font-black text-white mb-10 flex items-center gap-3 uppercase tracking-[0.3em]">
                    <Clock size={20} className="text-cp-cyan neon-text-cyan" /> 運用マイルストーン
                </h3>
                <div className="w-full">
                    {/* Desktop View */}
                    <table className="hidden md:table w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                                <th className="py-4 px-6 w-32">運用年数</th>
                                <th className="py-4 px-6 w-40">予想資産</th>
                                <th className="py-4 px-6">ライフイベント</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[result.yearlyData[0], ...decadesData].map((d, i) => {
                                const eventInfo = i > 0 ? displayedEvents[i - 1].event : null;
                                return (
                                    <tr key={d.year} className="border-b border-zinc-900/50 hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-6 px-6 font-mono text-zinc-400 font-black text-sm uppercase tracking-tighter">{d.year}年目</td>
                                        <td className="py-6 px-6 font-black text-cp-cyan font-mono text-xl tracking-tighter">¥{Math.floor(d.amount / 10000).toLocaleString()}万円</td>
                                        <td className="py-6 px-6">
                                            {eventInfo ? (
                                                <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[10px] font-black text-black bg-cp-cyan px-2 py-0.5 rounded-sm inline-block mb-2 uppercase tracking-tighter">{eventInfo.title}</span>
                                                    <p className="text-sm text-zinc-400 leading-relaxed max-w-lg italic">{eventInfo.description}</p>
                                                </div>
                                            ) : (
                                                <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">// 運用開始</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Mobile View */}
                    <div className="md:hidden flex flex-col gap-6">
                        {[result.yearlyData[0], ...decadesData].map((d, i) => {
                            const eventInfo = i > 0 ? displayedEvents[i - 1].event : null;
                            return (
                                <div key={d.year} className="bg-black/40 border border-zinc-900 p-6 flex flex-col gap-4 relative">
                                    <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-zinc-800 tracking-tighter italic">記録_{d.year}年</div>
                                    <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                                        <span className="font-black text-zinc-500 text-xs uppercase tracking-widest">{d.year}年目</span>
                                        <span className="font-black text-cp-cyan font-sans text-2xl tracking-tighter">¥{Math.floor(d.amount / 10000).toLocaleString()}万円</span>
                                    </div>
                                    <div className="pt-2">
                                        {eventInfo ? (
                                            <div>
                                                <span className="text-[10px] font-black text-black bg-cp-cyan px-2 py-0.5 rounded-sm inline-block mb-2 uppercase tracking-tighter">{eventInfo.title}</span>
                                                <p className="text-xs text-zinc-400 leading-relaxed italic">{eventInfo.description}</p>
                                            </div>
                                        ) : (
                                            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">// 運用開始</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MBTI x Phase Advice Area */}
            <div className="grid grid-cols-1 gap-8">
                {/* Phase Action */}
                <div className="glass-card-cp rounded-none border-l-4 border-cp-violet p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:opacity-20 transition-opacity duration-1000 transform group-hover:scale-110">
                        <ShieldCheck size={280} className="text-cp-violet" />
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <span className="px-3 py-1 bg-cp-violet/20 text-cp-violet text-[10px] font-black border border-cp-violet/40 mb-8 inline-block tracking-[0.3em] uppercase">
                            運用フェーズ: {currentPhase.name}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic whitespace-nowrap">
                            {currentPhase.strategy}
                        </h3>
                        <p className="text-cp-violet text-lg md:text-xl mb-8 font-black uppercase tracking-widest">{currentPhase.priority}</p>
                        <div className="bg-black/60 p-8 border border-zinc-900 backdrop-blur-xl">
                            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-bold tracking-tight">{currentPhase.description}</p>
                        </div>
                    </div>
                </div>

                {/* MBTI Advice */}
                {mbtiProfile && (
                    <div className="glass-card-cp rounded-none border-t border-zinc-800 p-8 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-cp-cyan/5 blur-[120px] rounded-full pointer-events-none translate-x-32 -translate-y-32"></div>
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 relative z-10">
                            <div className="lg:w-2/3">
                                <span className="px-4 py-2 bg-cp-cyan/10 text-cp-cyan text-[10px] font-black border border-cp-cyan/30 mb-10 inline-block tracking-[0.4em] uppercase">
                                    投資タイプ: {mbtiProfile.type} // {mbtiProfile.name}
                                </span>
                                <h3 className="text-4xl font-black text-white mb-10 uppercase tracking-tighter italic">戦術アドバイス</h3>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="bg-black/40 p-6 border border-zinc-900 relative">
                                            <div className="absolute top-2 left-2 w-2 h-2 bg-cp-cyan shadow-[0_0_5px_var(--cp-cyan)]" />
                                            <p className="text-[10px] text-zinc-500 mb-4 font-black tracking-widest uppercase">あなたの強み</p>
                                            <p className="text-xl font-black text-cp-cyan tracking-tighter uppercase">{mbtiProfile.strength}</p>
                                        </div>
                                        <div className="bg-black/40 p-6 border border-zinc-900 relative">
                                            <div className="absolute top-2 left-2 w-2 h-2 bg-cp-fuchsia shadow-[0_0_5px_var(--cp-fuchsia)]" />
                                            <p className="text-[10px] text-zinc-500 mb-4 font-black tracking-widest uppercase">リスク要因</p>
                                            <p className="text-xl font-black text-cp-fuchsia tracking-tighter uppercase">{mbtiProfile.weakness}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-cp-cyan/20 to-transparent border-l-4 border-cp-cyan p-8 mt-10">
                                        <p className="text-[10px] text-cp-cyan mb-4 font-black tracking-widest uppercase glow-text-cyan underline decoration-cp-cyan/30 underline-offset-4">次にとるべき行動</p>
                                        <p className="text-2xl md:text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">{mbtiProfile.action}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/3 bg-black/40 p-10 border border-zinc-900 flex flex-col justify-center relative shadow-2xl mt-10 lg:mt-0">
                                <div className="absolute top-4 left-4 text-4xl text-zinc-800 font-mono opacity-50 select-none">/ *</div>
                                <div className="absolute bottom-4 right-4 text-4xl text-zinc-800 font-mono opacity-50 select-none">* /</div>
                                <p className="text-[10px] text-zinc-600 mb-8 font-black tracking-[0.3em] text-center uppercase">// 視点の転換</p>
                                <p className="text-zinc-100 font-bold text-center text-lg leading-relaxed relative z-10 italic font-medium">
                                    "{mbtiProfile.perspectiveShift}"
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 text-center lg:text-right">
                            <a
                                href="https://toushi-shindan.vercel.app/"
                                className="group inline-flex items-center gap-4 text-[10px] text-zinc-500 hover:text-white transition-all bg-transparent hover:bg-zinc-900 border border-zinc-800 hover:border-cp-cyan px-8 py-4 rounded-none font-black uppercase tracking-[0.2em]"
                            >
                                <span className="group-hover:neon-text-cyan transition-all">診断をやり直す</span>
                                <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-cp-cyan transition-all" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
