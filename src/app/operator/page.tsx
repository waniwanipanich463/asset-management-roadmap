import Link from "next/link";
import { ChevronLeft, Info, ShieldAlert, Scale } from "lucide-react";

export default function OperatorPage() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 font-sans">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Back Link */}
                <Link
                    href="/simulate"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>シミュレーションに戻る</span>
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        運営主体・免責事項
                    </h1>
                    <div className="h-1 w-20 bg-blue-500 rounded-full" />
                </header>

                <div className="space-y-16">
                    {/* Operating Entity Section */}
                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-8 text-blue-400">
                            <Info className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">運営者情報</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 text-lg">
                            <div className="text-zinc-500 font-medium">運営者名</div>
                            <div className="text-white">つむぎ部屋</div>

                            <div className="text-zinc-500 font-medium">所在地</div>
                            <div className="text-white">日本</div>

                            <div className="text-zinc-500 font-medium">お問い合わせ</div>
                            <div className="text-white">money.revenge001@gmail.com</div>

                            <div className="text-zinc-500 font-medium">サイトURL</div>
                            <div className="text-blue-400 hover:underline">
                                <a href="https://youtube.com/channel/UC2VfIGmIV_2FSB7r0fIkbKg?si=4RIJ_ZebY8oljmo4" target="_blank" rel="noopener noreferrer">
                                    https://youtube.com/channel/UC2VfIGmIV_2FSB7r0fIkbKg?si=4RIJ_ZebY8oljmo4
                                </a>
                            </div>

                            <div className="text-zinc-500 font-medium">制定日</div>
                            <div className="text-white">11月28日</div>
                        </div>
                    </section>

                    {/* Disclaimer Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6 text-amber-500">
                            <ShieldAlert className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">免責事項</h2>
                        </div>
                        <div className="prose prose-invert prose-zinc max-w-none space-y-4 text-zinc-400 leading-relaxed">
                            <p>本サイトは、資産運用シミュレーションを提供する情報コンテンツサイトです。</p>
                            <p>本サイトで提供する情報は、教育・情報提供およびエンターテインメントを目的としたものであり、特定の金融商品の勧誘、売買の推奨、投資助言、または投資判断の根拠を提供するものではありません。</p>
                            <p>本サイト内で紹介する銘柄、指数、投資手法等は、あくまで説明のための例示であり、特定の金融商品の購入・売却を推奨するものではありません。</p>
                            <p>シミュレーション結果は、一定の仮定および入力条件に基づく試算結果であり、将来の運用成果、利回り、元本の安全性を保証するものではありません。</p>
                            <p>投資には価格変動リスク、元本割れリスク、為替リスク等が伴います。最終的な投資判断は、ご利用者様ご自身の責任において行ってください。</p>
                            <p>本サイトの情報の正確性・完全性・最新性については可能な限り配慮しておりますが、これを保証するものではありません。</p>
                            <p>本サイトの利用により生じた損害について、運営者は一切の責任を負いません。</p>
                        </div>
                    </section>

                    {/* Financial Instruments and Exchange Act Section */}
                    <section className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6 text-zinc-400">
                            <Scale className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">金融商品取引法に関する表示</h2>
                        </div>
                        <ul className="list-disc list-inside space-y-3 text-zinc-400">
                            <li>本サイトは、金融商品取引法上の登録業者ではありません。</li>
                            <li>本サイトは、投資助言・代理業には該当しない範囲で情報を提供しています。</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
