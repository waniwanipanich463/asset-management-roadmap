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
        <>
            <SimulateClient
                initialMbti={mbti}
                initialTargetAsset={target}
                initialAssetAmount={asset}
                initialMonthlyInvestment={monthly}
                initialYears={years}
                initialAnnualReturn={annualReturn}
            />
        </>
    );
}
