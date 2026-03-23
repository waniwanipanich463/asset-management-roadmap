import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-cp-fuchsia/20 bg-black/80 backdrop-blur-md relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cp-fuchsia/5 blur-3xl rounded-full translate-x-32 translate-y-32" />
            
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10">
                <div className="mb-10 text-xs text-zinc-500 text-center md:text-left leading-relaxed font-medium uppercase tracking-tighter max-w-2xl">
                    <span className="text-cp-fuchsia font-bold mr-2">// DISCLAIMER:</span>
                    本サイトは一般的な情報提供およびシミュレーション機能を提供するものであり、特定の金融商品の取得・売却を推奨するものではありません。
                    表示される数値は一定の仮定に基づく試算であり、将来の運用成果を保証するものではありません。
                    投資に関する最終判断はご自身の責任にてお願いいたします。
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-zinc-900 pt-8">
                    <div className="text-zinc-500 text-sm font-black tracking-[0.2em] uppercase">
                        © 2026 <span className="text-white">TSUMUGI</span>_REVENGE_SYSTEM
                    </div>

                    <nav className="flex items-center gap-10">
                        <Link
                            href="/operator"
                            className="text-sm font-bold text-zinc-400 hover:text-cp-cyan transition-all uppercase tracking-widest hover:neon-text-cyan"
                        >
                            運営主体・免責事項
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm font-bold text-zinc-400 hover:text-cp-fuchsia transition-all uppercase tracking-widest hover:neon-text-fuchsia"
                        >
                            プライバシーポリシー
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
