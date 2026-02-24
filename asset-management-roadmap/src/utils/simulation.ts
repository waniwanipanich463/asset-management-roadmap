export type SimulationInput = {
  initialAsset: number;
  monthlyInvestment: number;
  years: number;
  annualReturn: number;
  targetAsset: number;
};

export type YearlyData = {
  year: number;
  amount: number;
  principal: number;
};

export type SimulationResult = {
  finalAmount: number;
  yearlyData: YearlyData[];
  targetReachYear: number | null;
};

export function calculateForward(input: SimulationInput): SimulationResult {
  const { initialAsset, monthlyInvestment, years, annualReturn, targetAsset } = input;
  let total = initialAsset;
  let principal = initialAsset;
  const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
  const yearlyData: YearlyData[] = [{ year: 0, amount: Math.floor(total), principal: Math.floor(principal) }];
  let targetReachYear: number | null = null;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      total = total * (1 + monthlyRate) + monthlyInvestment;
      principal += monthlyInvestment;
      if (targetReachYear === null && total >= targetAsset) {
        targetReachYear = year - 1 + month / 12;
      }
    }
    yearlyData.push({ year, amount: Math.floor(total), principal: Math.floor(principal) });
  }

  // If target is less than initial asset, reach year is 0
  if (initialAsset >= targetAsset) {
    targetReachYear = 0;
  }

  return {
    finalAmount: Math.floor(total),
    yearlyData,
    targetReachYear: targetReachYear !== null ? Math.round(targetReachYear * 10) / 10 : null,
  };
}

// 逆算ロジック: 必要利回り
export function calculateRequiredReturn(
  targetAsset: number,
  initialAsset: number,
  monthlyInvestment: number,
  years: number
): number {
  const principal = initialAsset + monthlyInvestment * 12 * years;
  if (targetAsset <= principal) return 0;

  let low = 0;
  let high = 100; // max 100% search space
  const tolerance = targetAsset * 0.001; // 0.1% tolerance

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const res = calculateForward({
      initialAsset,
      monthlyInvestment,
      years,
      annualReturn: mid,
      targetAsset,
    });

    if (Math.abs(res.finalAmount - targetAsset) <= tolerance) {
      return mid;
    } else if (res.finalAmount < targetAsset) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

// 逆算ロジック: 必要積立額
export function calculateRequiredMonthly(
  targetAsset: number,
  initialAsset: number,
  years: number,
  annualReturn: number
): number {
  if (annualReturn <= 0) {
    const needed = targetAsset - initialAsset;
    return Math.max(0, needed / (years * 12));
  }

  let low = 0;
  let high = targetAsset;
  const tolerance = targetAsset * 0.001; // 0.1% tolerance

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const res = calculateForward({
      initialAsset,
      monthlyInvestment: mid,
      years,
      annualReturn,
      targetAsset,
    });

    if (Math.abs(res.finalAmount - targetAsset) <= tolerance) {
      return mid;
    } else if (res.finalAmount < targetAsset) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

// 逆算ロジック: 必要年数
export function calculateRequiredYears(
  targetAsset: number,
  initialAsset: number,
  monthlyInvestment: number,
  annualReturn: number
): number | null {
  const res = calculateForward({
    initialAsset,
    monthlyInvestment,
    years: 100, // Search up to 100 years
    annualReturn,
    targetAsset,
  });
  return res.targetReachYear;
}
