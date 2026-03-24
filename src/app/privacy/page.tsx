import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";

export default function PrivacyPage() {
    const sections = [
        {
            title: "1. 取得する情報",
            content: "当サイトは、以下の情報を取得することがあります。",
            list: [
                "お問い合わせフォームに入力された氏名・メールアドレス",
                "IPアドレス",
                "Cookie情報",
                "アクセスログ情報",
                "利用端末情報",
                "診断結果およびシミュレーション入力データ"
            ]
        },
        {
            title: "2. 利用目的",
            content: "取得した情報は、以下の目的で利用します。",
            list: [
                "本サービスの提供および運営のため",
                "お問い合わせへの対応のため",
                "サービス改善および機能向上のため",
                "利用状況の分析のため",
                "不正利用の防止のため",
                "広告配信および広告最適化のため"
            ]
        },
        {
            title: "3. Cookieの使用について",
            content: "当サイトでは、利便性向上、アクセス解析、広告配信のためにCookieを使用しています。ユーザーはブラウザの設定によりCookieを無効にすることが可能です。ただし、無効化した場合、当サイトの一部機能が正常に利用できない場合があります。"
        },
        {
            title: "4. アクセス解析ツールについて",
            content: "当サイトでは、Google Analytics等のアクセス解析ツールを利用する場合があります。これらのツールはトラフィックデータ収集のためにCookieを使用します。収集されるデータは匿名であり、個人を特定するものではありません。"
        },
        {
            title: "5. 広告配信について",
            content: "当サイトは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。広告配信事業者は、ユーザーの興味関心に応じた広告を表示するため、Cookieを使用することがあります。パーソナライズ広告を無効にする方法については、Google広告設定をご確認ください。"
        },
        {
            title: "6. 第三者提供",
            content: "当サイトは、以下の場合を除き、取得した個人情報を第三者に提供することはありません。",
            list: [
                "本人の同意がある場合",
                "法令に基づく場合",
                "人の生命・身体・財産の保護のために必要な場合"
            ]
        },
        {
            title: "7. 安全管理措置",
            content: "当サイトは、個人情報の漏えい、滅失、毀損を防止するため、適切な安全管理措置を講じます。"
        },
        {
            title: "8. 個人情報の開示・訂正・削除",
            content: "ご本人からの個人情報の開示・訂正・削除のご請求があった場合、適切に対応いたします。お問い合わせ先：money.revenge001@gmail.com"
        },
        {
            title: "9. 未成年の利用について",
            content: "未成年者が当サイトを利用する場合は、保護者の同意を得たうえでご利用ください。"
        },
        {
            title: "10. 改定",
            content: "本ポリシーは、法令の改正やサービス内容の変更等に応じて、予告なく変更する場合があります。変更後のポリシーは、本サイトに掲載した時点で効力を生じます。"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020205] text-zinc-100 font-sans scanlines">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">
                {/* Back Link */}
                <Link
                    href="/simulate"
                    className="inline-flex items-center gap-2 text-cp-cyan hover:text-white transition-all mb-12 group"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold tracking-widest uppercase">シミュレーションに戻る</span>
                </Link>

                <header className="mb-20 relative">
                    <div className="absolute -left-4 top-0 w-1 h-14 bg-cp-cyan shadow-[0_0_15px_var(--cp-cyan)]" />
                    <div className="flex items-center gap-4 mb-6 text-cp-cyan">
                        <Lock className="w-10 h-10" />
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase glitch-hover">
                            プライバシー<span className="text-cp-cyan">ポリシー</span>
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-lg max-w-2xl border-l-2 border-cp-cyan/30 pl-6 leading-relaxed">
                        資産運用シミュレーション（以下、「当サイト」）における個人情報の処理および保護に関するプロトコルを定義します。
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {sections.map((section, index) => (
                        <section key={index} className="glass-card-cp p-8 relative group hover:border-cp-cyan/50 transition-colors">
                            <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-cp-cyan/20">
                                SECTION_ID: {index + 1}
                            </div>
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-cp-cyan" />
                                {section.title}
                            </h2>
                            <div className="space-y-4">
                                <p className="text-zinc-300 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                                {section.list && (
                                    <ul className="space-y-3 ml-4">
                                        {section.list.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-zinc-400">
                                                <span className="text-cp-cyan font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Decorative Footer Element */}
                <div className="mt-20 flex justify-center opacity-20">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cp-cyan to-transparent" />
                </div>
            </div>
        </div>
    );
}
