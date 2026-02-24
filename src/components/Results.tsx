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
                <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xl">
                    <p className="text-gray-700 mb-2 font-medium">{`${label}年目`}</p>
                    <p className="text-accent-teal font-bold mb-1">{`総資産: ${Math.floor(payload[0].value / 10000).toLocaleString()}万円`}</p>
                    <p className="text-gray-600 text-sm hidden sm:block">{`元本: ${Math.floor(payload[0].payload.principal / 10000).toLocaleString()}万円`}</p>
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
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-accent-teal/30 transition-all shadow-sm">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-accent-teal">
                        <TrendingUp size={80} />
                    </div>
                    <p className="text-gray-700 font-bold text-sm mb-2 whitespace-nowrap tracking-wider">最終予想資産 ({input.years}年後)</p>
                    <p className="text-4xl lg:text-5xl font-extrabold text-foreground font-sans tracking-tight mt-2 whitespace-nowrap">
                        {Math.floor(result.finalAmount / 10000).toLocaleString()} <span className="text-xl text-gray-600 font-sans font-medium">万円</span>
                    </p>
                    <p className="mt-4 text-xs font-bold text-gray-600">
                        元本: {Math.floor((input.initialAsset + input.monthlyInvestment * 12 * input.years) / 10000).toLocaleString()}万円
                    </p>
                </div>

                <div className={`bg-white border ${isTargetReached ? 'border-emerald-100' : 'border-rose-100'} rounded-[2.5rem] p-8 relative overflow-hidden shadow-sm`}>
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Target size={80} className={isTargetReached ? "text-emerald-500" : "text-rose-500"} />
                    </div>
                    <p className="text-gray-700 font-bold text-sm mb-2 whitespace-nowrap tracking-wider">目標達成状況</p>
                    {isTargetReached ? (
                        <div className="mt-2 text-emerald-600">
                            <p className="text-3xl font-bold whitespace-nowrap mb-2">
                                {result.targetReachYear}年目で達成🎉
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">素晴らしいペースです。このまま継続し、次のフェーズを目指しましょう。</p>
                        </div>
                    ) : (
                        <div className="mt-2 text-rose-600">
                            <p className="text-3xl font-bold whitespace-nowrap mb-2">
                                目標未達
                            </p>
                            <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl text-sm flex flex-col gap-2">
                                <span className="flex items-center gap-1.5 text-rose-600 font-bold"><AlertCircle size={16} /> 代替シナリオ提案</span>
                                <span className="text-rose-700/80 font-medium">目標に到達するには毎月 <strong>{Math.ceil(requiredMonthly / 1000).toLocaleString()}千円</strong> の積立が目安となります。</span>
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
                                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
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
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <Clock size={24} className="text-accent-teal" /> 10年ごとのマイルストーン
                </h3>
                <div className="w-full">
                    {/* Desktop View */}
                    <table className="hidden md:table w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-600 text-sm">
                                <th className="py-4 px-4 font-bold w-24 tracking-wider">経過年</th>
                                <th className="py-4 px-4 font-bold w-32 tracking-wider">予想資産</th>
                                <th className="py-4 px-4 font-bold tracking-wider">歴史的イベント例</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[result.yearlyData[0], ...decadesData].map((d, i) => {
                                const eventInfo = i > 0 ? displayedEvents[i - 1].event : null;
                                return (
                                    <tr key={d.year} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                        <td className="py-5 px-4 font-mono text-gray-500 font-medium">{d.year}年目</td>
                                        <td className="py-5 px-4 font-bold text-blue-600 font-mono text-lg">{Math.floor(d.amount / 10000).toLocaleString()}万円</td>
                                        <td className="py-5 px-4">
                                            {eventInfo ? (
                                                <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-sm font-bold text-white bg-gray-600 px-2 py-1 rounded inline-block mb-2">{eventInfo.title} ({eventInfo.year}年)</span>
                                                    <p className="text-sm text-gray-600">{eventInfo.description}</p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm italic">- シミュレーション開始 -</span>
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
                                <div key={d.year} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="font-sans text-gray-700 font-bold text-sm tracking-widest">{d.year}年目</span>
                                        <span className="font-bold text-accent-teal font-sans text-2xl">{Math.floor(d.amount / 10000).toLocaleString()}万円</span>
                                    </div>
                                    <div className="pt-1">
                                        {eventInfo ? (
                                            <div>
                                                <span className="text-xs font-bold text-white bg-gray-600 px-2 py-1 rounded inline-block mb-1.5">{eventInfo.title} ({eventInfo.year}年)</span>
                                                <p className="text-xs text-gray-600 leading-relaxed">{eventInfo.description}</p>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 text-xs italic">- シミュレーション開始 -</span>
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
                <div className="bg-gradient-to-br from-indigo-950 to-blue-950 border border-indigo-500/50 rounded-3xl p-6 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 blur-[2px]">
                        <ShieldCheck size={160} />
                    </div>
                    <div className="relative z-10">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/40 text-indigo-100 text-xs font-bold border border-indigo-400/50 mb-6 inline-block tracking-wider">
                            現在のフェーズ: {currentPhase.name}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight drop-shadow-sm">{currentPhase.strategy}</h3>
                        <p className="text-indigo-100 text-lg mb-6 font-bold">{currentPhase.priority}</p>
                        <div className="bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                            <p className="text-sm md:text-base text-zinc-100 leading-relaxed font-medium">{currentPhase.description}</p>
                        </div>
                    </div>
                </div>

                {/* MBTI Advice */}
                {mbtiProfile && (
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-teal/5 blur-[100px] rounded-full pointer-events-none"></div>
                        <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-10 relative z-10">
                            <div className="lg:w-2/3">
                                <span className="px-4 py-1.5 rounded-full bg-accent-teal/10 text-accent-teal text-xs font-bold border border-accent-teal/20 mb-8 inline-block tracking-widest whitespace-nowrap">
                                    投資タイプ: {mbtiProfile.type} ({mbtiProfile.name})
                                </span>
                                <h3 className="text-3xl font-bold text-foreground mb-8">あなた専用の行動提案</h3>
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-600 mb-3 font-bold tracking-widest">STRENGTH</p>
                                            <p className="text-lg font-bold text-accent-teal">{mbtiProfile.strength}</p>
                                        </div>
                                        <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-600 mb-3 font-bold tracking-widest">WEAKNESS</p>
                                            <p className="text-lg font-bold text-rose-500">{mbtiProfile.weakness}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-accent-teal/10 to-teal-50 border border-accent-teal/20 p-8 rounded-3xl mt-6">
                                        <p className="text-xs text-accent-teal mb-3 font-bold tracking-widest uppercase">Next Action</p>
                                        <p className="text-2xl md:text-3xl font-black text-foreground">{mbtiProfile.action}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/3 bg-gray-50/50 p-10 rounded-[2rem] border border-gray-100 flex flex-col justify-center relative shadow-inner">
                                <div className="absolute top-6 left-6 text-6xl text-gray-200 font-serif opacity-50 select-none">“</div>
                                <div className="absolute bottom-6 right-6 text-6xl text-gray-200 font-serif opacity-50 select-none">”</div>
                                <p className="text-xs text-gray-600 mb-6 font-bold tracking-widest text-center uppercase">Perspective Shift</p>
                                <p className="text-foreground font-bold text-center text-lg leading-relaxed relative z-10 italic">
                                    {mbtiProfile.perspectiveShift}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 text-center sm:text-right">
                            <a
                                href="https://toushi-shindan.vercel.app/"
                                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-accent-teal transition-all bg-gray-100 hover:bg-white border border-transparent hover:border-accent-teal/20 px-6 py-3 rounded-full font-bold shadow-sm"
                            >
                                投資診断をやり直す
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
