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
            content: "ご本人からの個人情報の開示・訂正・削除のご請求があった場合、適切に対応いたします。お問い合わせ先：example@example.com"
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
                    <div className="flex items-center gap-3 mb-4 text-emerald-400">
                        <Lock className="w-8 h-8 md:w-10 md:h-10" />
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            プライバシーポリシー
                        </h1>
                    </div>
                    <p className="text-zinc-500 text-lg">
                        資産運用シミュレーション（以下、「当サイト」といいます。）は、個人情報の保護に関する法律に基づき、以下の通りプライバシーポリシーを定めます。
                    </p>
                </header>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <section key={index} className="space-y-4">
                            <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-3">
                                {section.title}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                {section.content}
                            </p>
                            {section.list && (
                                <ul className="list-disc list-inside space-y-2 text-zinc-400 ml-2">
                                    {section.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
