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

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-blue-500/30">
            <SimulateClient initialMbti={mbti} initialTargetAsset={target} initialAssetAmount={asset} />
        </main>
    );
}
