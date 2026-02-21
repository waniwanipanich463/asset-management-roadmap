import SimulateClient from "@/components/SimulateClient";

export default async function SimulatePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const mbti = typeof params.mbti === "string" ? params.mbti.toUpperCase() : undefined;
    const target = typeof params.target === "string" ? params.target : undefined;
    const asset = typeof params.asset === "string" ? params.asset : undefined;
    const monthly = typeof params.monthly === "string" ? params.monthly : undefined;
    const years = typeof params.years === "string" ? params.years : undefined;
    const annualReturn = typeof params.return === "string" ? params.return : undefined;

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-blue-500/30 flex flex-col">
            <div className="flex-grow">
                <SimulateClient
                    initialMbti={mbti}
                    initialTargetAsset={target}
                    initialAssetAmount={asset}
                    initialMonthlyInvestment={monthly}
                    initialYears={years}
                    initialAnnualReturn={annualReturn}
                />
            </div>
            <footer className="py-8 text-center border-t border-zinc-800/50 mt-auto bg-zinc-950">
                <a
                    href="https://shota-world.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium tracking-wider"
                >
                    Designed by Shota Niwano
                </a>
            </footer>
        </main>
    );
}
