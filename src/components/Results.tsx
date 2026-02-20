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
                <div className="bg-zinc-950 border border-zinc-700 p-4 rounded-xl shadow-2xl">
                    <p className="text-zinc-400 mb-2 font-medium">{`${label}年目`}</p>
                    <p className="text-blue-400 font-bold mb-1">{`総資産: ${Math.floor(payload[0].value / 10000).toLocaleString()}万円`}</p>
                    <p className="text-zinc-500 text-sm hidden sm:block">{`元本: ${Math.floor(payload[0].payload.principal / 10000).toLocaleString()}万円`}</p>
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
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={80} />
                    </div>
                    <p className="text-zinc-400 font-medium mb-1 whitespace-nowrap">最終予想資産 ({input.years}年後)</p>
                    <p className="text-4xl lg:text-5xl font-extrabold text-zinc-100 font-mono tracking-tight mt-2 whitespace-nowrap">
                        {Math.floor(result.finalAmount / 10000).toLocaleString()} <span className="text-xl text-zinc-500 font-sans font-medium">万円</span>
                    </p>
                    <p className="mt-4 text-xs font-medium text-zinc-500">
                        元本: {Math.floor((input.initialAsset + input.monthlyInvestment * 12 * input.years) / 10000).toLocaleString()}万円
                    </p>
                </div>

                <div className={`bg-zinc-900 border ${isTargetReached ? 'border-emerald-900/50' : 'border-rose-900/50'} rounded-3xl p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Target size={80} className={isTargetReached ? "text-emerald-500" : "text-rose-500"} />
                    </div>
                    <p className="text-zinc-400 font-medium mb-1 whitespace-nowrap">目標達成状況</p>
                    {isTargetReached ? (
                        <div className="mt-2">
                            <p className="text-3xl font-bold text-emerald-400 whitespace-nowrap">
                                {result.targetReachYear}年目で達成🎉
                            </p>
                            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">素晴らしいペースです。このまま継続し、次のフェーズを目指しましょう。</p>
                        </div>
                    ) : (
                        <div className="mt-2 text-zinc-300">
                            <p className="text-3xl font-bold text-rose-400 whitespace-nowrap">
                                目標未達
                            </p>
                            <div className="mt-4 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-sm flex flex-col gap-2">
                                <span className="flex items-center gap-1.5 text-rose-300 font-bold"><AlertCircle size={16} /> 代替シナリオ提案</span>
                                <span className="text-rose-200/80">目標に到達するには毎月 <strong>{Math.ceil(requiredMonthly / 1000).toLocaleString()}千円</strong> の積立が必要です。</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Chart */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
                    資産推移シミュレーション
                </h3>
                <div className="h-72 sm:h-80 w-full ml-[-20px] sm:ml-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={result.yearlyData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="year" stroke="#71717a" tick={{ fill: '#71717a', fontSize: 12 }} tickMargin={10} minTickGap={20} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" stroke="#71717a" tick={{ fill: '#71717a', fontSize: 12 }} tickFormatter={formatYAxis} width={60} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area yAxisId="left" type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 6, strokeWidth: 0, fill: '#60a5fa' }} />
                            <Area yAxisId="left" type="monotone" dataKey="principal" stroke="#71717a" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPrincipal)" activeDot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 10 Year Table & Events */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" /> 10年ごとのマイルストーン
                </h3>
                <div className="w-full">
                    {/* Desktop View */}
                    <table className="hidden md:table w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                                <th className="py-3 px-4 font-medium w-24">経過年</th>
                                <th className="py-3 px-4 font-medium w-32">予想資産</th>
                                <th className="py-3 px-4 font-medium">歴史的イベント例</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[result.yearlyData[0], ...decadesData].map((d, i) => {
                                const eventInfo = i > 0 ? displayedEvents[i - 1].event : null;
                                return (
                                    <tr key={d.year} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group">
                                        <td className="py-5 px-4 font-mono text-zinc-300 font-medium">{d.year}年目</td>
                                        <td className="py-5 px-4 font-bold text-blue-400 font-mono text-lg">{Math.floor(d.amount / 10000).toLocaleString()}万円</td>
                                        <td className="py-5 px-4">
                                            {eventInfo ? (
                                                <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-sm font-bold text-zinc-200 bg-zinc-800 px-2 py-1 rounded inline-block mb-2">{eventInfo.title} ({eventInfo.year}年)</span>
                                                    <p className="text-sm text-zinc-400">{eventInfo.description}</p>
                                                </div>
                                            ) : (
                                                <span className="text-zinc-600 text-sm italic">- シミュレーション開始 -</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Mobile View */}
                    <div className="md:hidden flex flex-col gap-4">
                        {[result.yearlyData[0], ...decadesData].map((d, i) => {
                            const eventInfo = i > 0 ? displayedEvents[i - 1].event : null;
                            return (
                                <div key={d.year} className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 flex flex-col gap-3">
                                    <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                                        <span className="font-mono text-zinc-400 font-medium text-sm">{d.year}年目</span>
                                        <span className="font-bold text-blue-400 font-mono text-xl">{Math.floor(d.amount / 10000).toLocaleString()}万円</span>
                                    </div>
                                    <div className="pt-1">
                                        {eventInfo ? (
                                            <div>
                                                <span className="text-xs font-bold text-zinc-300 bg-zinc-800 px-2 py-1 rounded inline-block mb-1.5">{eventInfo.title} ({eventInfo.year}年)</span>
                                                <p className="text-xs text-zinc-400 leading-relaxed">{eventInfo.description}</p>
                                            </div>
                                        ) : (
                                            <span className="text-zinc-600 text-xs italic">- シミュレーション開始 -</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MBTI x Phase Advice Area */}
            <div className="grid grid-cols-1 gap-6">
                {/* Phase Action */}
                <div className="bg-gradient-to-br from-indigo-950/80 to-blue-950/40 border border-indigo-500/30 rounded-3xl p-6 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-[0.08] transition-opacity duration-700 blur-sm">
                        <ShieldCheck size={160} />
                    </div>
                    <div className="relative z-10">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-6 inline-block tracking-wider">
                            現在のフェーズ: {currentPhase.name}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">{currentPhase.strategy}</h3>
                        <p className="text-indigo-200/90 text-lg mb-6 font-medium">{currentPhase.priority}</p>
                        <div className="bg-black/20 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">{currentPhase.description}</p>
                        </div>
                    </div>
                </div>

                {/* MBTI Advice */}
                {mbtiProfile && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                        <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-8 relative z-10">
                            <div className="lg:w-2/3">
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-700 mb-6 inline-block tracking-wider">
                                    MBTI特性: {mbtiProfile.type}
                                </span>
                                <h3 className="text-2xl font-bold text-zinc-100 mb-6">あなた専用の行動提案</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80">
                                            <p className="text-xs text-zinc-500 mb-2 font-bold tracking-widest">STRENGTH</p>
                                            <p className="text-base font-medium text-blue-400">{mbtiProfile.strength}</p>
                                        </div>
                                        <div className="flex-1 bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80">
                                            <p className="text-xs text-zinc-500 mb-2 font-bold tracking-widest">WEAKNESS</p>
                                            <p className="text-base font-medium text-rose-400">{mbtiProfile.weakness}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 border border-blue-500/30 p-6 rounded-2xl mt-4">
                                        <p className="text-xs text-blue-400 mb-2 font-bold tracking-widest">NEXT ACTION</p>
                                        <p className="text-xl md:text-2xl font-bold text-white">{mbtiProfile.action}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/3 bg-zinc-800/40 p-8 rounded-2xl border border-zinc-700/50 flex flex-col justify-center relative">
                                <div className="absolute top-4 left-4 text-4xl text-zinc-700 font-serif opacity-50">"</div>
                                <div className="absolute bottom-4 right-4 text-4xl text-zinc-700 font-serif opacity-50">"</div>
                                <p className="text-xs text-zinc-400 mb-4 font-bold tracking-widest text-center">価値観の再定義</p>
                                <p className="text-zinc-200 font-bold text-center leading-relaxed relative z-10">
                                    {mbtiProfile.perspectiveShift}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 text-center sm:text-right">
                            <a
                                href="https://toushi-shindan.vercel.app/"
                                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full font-medium"
                            >
                                MBTI診断をやり直す
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
