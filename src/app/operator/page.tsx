import Link from "next/link";
import { ChevronLeft, Info, ShieldAlert, Scale } from "lucide-react";

export default function OperatorPage() {
    return (
        <div className="min-h-screen bg-transparent text-zinc-100 font-sans scanlines">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">
                {/* Back Link */}
                <Link
                    href="/simulate"
                    className="inline-flex items-center gap-2 text-cp-cyan hover:text-white transition-all mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold tracking-widest">シミュレーションに戻る</span>
                </Link>

                <header className="mb-16 relative">
                    <div className="absolute -left-4 top-0 w-1 h-12 bg-cp-fuchsia shadow-[0_0_15px_var(--cp-fuchsia)]" />
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase glitch-hover">
                        運営主体・<span className="text-cp-fuchsia">免責事項</span>
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-cp-fuchsia to-transparent" />
                </header>

                <div className="space-y-12">
                    {/* Operating Entity Section */}
                    <section className="glass-card-cp rounded-none border-l-4 border-cp-cyan p-8 md:p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cp-cyan/5 -rotate-45 translate-x-16 -translate-y-16" />
                        <div className="flex items-center gap-3 mb-8 text-cp-cyan text-cp-cyan">
                            <Info className="w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase tracking-widest">運営者情報</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-6 gap-x-8 text-lg">
                            <div className="text-zinc-500 font-bold uppercase tracking-tighter text-sm">運営主体名</div>
                            <div className="text-white font-medium">つむぎ部屋</div>

                            <div className="text-zinc-500 font-bold uppercase tracking-tighter text-sm">所在地</div>
                            <div className="text-white font-medium">日本 / Virtual Space</div>

                            <div className="text-zinc-500 font-bold uppercase tracking-tighter text-sm">連絡先</div>
                            <div className="text-cp-cyan font-bold hover:underline">
                                <a href="mailto:money.revenge001@gmail.com">money.revenge001@gmail.com</a>
                            </div>

                            <div className="text-zinc-500 font-bold uppercase tracking-tighter text-sm">システムURL</div>
                            <div className="text-cp-fuchsia font-bold hover:underline break-all">
                                <a href="https://youtube.com/channel/UC2VfIGmIV_2FSB7r0fIkbKg?si=4RIJ_ZebY8oljmo4" target="_blank" rel="noopener noreferrer">
                                    https://youtube.com/channel/UC2VfIGmIV_2FSB7r0fIkbKg?si=4RIJ_ZebY8oljmo4
                                </a>
                            </div>

                            <div className="text-zinc-500 font-bold uppercase tracking-tighter text-sm">設立日</div>
                            <div className="text-white font-medium">11月28日</div>
                        </div>
                    </section>

                    {/* Disclaimer Section */}
                    <section className="glass-card-cp rounded-none border-r-4 border-cp-fuchsia p-8 md:p-10 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-8 text-cp-fuchsia text-cp-fuchsia">
                            <ShieldAlert className="w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase tracking-widest">免責事項</h2>
                        </div>
                        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300 leading-relaxed font-medium">
                            <p className="border-l-2 border-cp-fuchsia/30 pl-4 py-1">本サイトは、資産運用シミュレーションを提供する情報コンテンツサイトです。</p>
                            <p>本サイトで提供する情報は、教育・情報提供およびエンターテインメントを目的としたものであり、特定の金融商品の勧誘、売買の推奨、投資助言、または投資判断の根拠を提供するものではありません。</p>
                            <p>本サイト内で紹介する銘柄、指数、投資手法等は、あくまで説明のための例示であり、特定の金融商品の購入・売却を推奨するものではありません。</p>
                            <p className="bg-cp-fuchsia/5 p-4 border border-cp-fuchsia/20">
                                シミュレーション結果は、一定の仮定および入力条件に基づく試算結果であり、将来の運用成果、利回り、元本の安全性を保証するものではありません。
                            </p>
                            <p>投資には価格変動リスク、元本割れリスク、為替リスク等が伴います。最終的な投資判断は、ご利用者様ご自身の責任において行ってください。</p>
                            <p>本サイトの情報の正確性・完全性・最新性については可能な限り配慮しておりますが、これを保証するものではありません。</p>
                            <p className="text-cp-fuchsia font-bold">本サイトの利用により生じた損害について、運営者は一切の責任を負いません。</p>
                        </div>
                    </section>

                    {/* Financial Instruments and Exchange Act Section */}
                    <section className="glass-card-cp rounded-none border border-zinc-800 p-8 md:p-10 bg-black/40">
                        <div className="flex items-center gap-3 mb-6 text-zinc-400">
                            <Scale className="w-6 h-6" />
                            <h2 className="text-xl font-black uppercase tracking-widest text-white">金融商品取引法に関する表示</h2>
                        </div>
                        <ul className="space-y-4 text-zinc-400 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="text-cp-cyan font-bold mt-1">▶</span>
                                <span>本サイトは、金融商品取引法上の登録業者ではありません。</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cp-cyan font-bold mt-1">▶</span>
                                <span>本サイトは、投資助言・代理業には該当しない範囲で情報を提供しています。</span>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Decorative Footer Element */}
                <div className="mt-16 flex justify-between items-center opacity-20">
                    <div className="text-[10px] font-mono tracking-widest">SYSTEM_VERSION: 2.0.26</div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-cp-cyan" />
                        <div className="w-2 h-2 bg-cp-fuchsia" />
                        <div className="w-2 h-2 bg-cp-yellow" />
                    </div>
                </div>
            </div>
        </div>
    );
}
