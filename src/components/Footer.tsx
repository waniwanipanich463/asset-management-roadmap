import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-8 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-gray-400 text-sm font-bold tracking-widest">
                    © 2026 つむぎの資産運用シミュレーション
                </div>

                <nav className="flex items-center gap-8">
                    <Link
                        href="/operator"
                        className="text-sm font-bold text-gray-400 hover:text-accent-teal transition-all underline-offset-4 hover:underline"
                    >
                        運営主体・免責事項
                    </Link>
                    <Link
                        href="/privacy"
                        className="text-sm font-bold text-gray-400 hover:text-accent-teal transition-all underline-offset-4 hover:underline"
                    >
                        プライバシーポリシー
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
