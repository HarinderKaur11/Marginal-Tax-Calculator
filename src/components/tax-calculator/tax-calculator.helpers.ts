import { TaxBracket } from "./tax-calculator.model";

export const getRoundedNumberForDisplay = (num: number): number => {
  return Math.round(num * 100 + Number.EPSILON) / 100;
};

export const getMarginalTaxRateObject = (
  salary: number,
  brackets: TaxBracket[]
) => {
  let balance = salary;
  const marginalRateData = brackets.map((bracket: TaxBracket) => {
    const { min, max, rate } = bracket;
    let taxableAmount;
    if (!max) {
      taxableAmount = balance;
    } else {
      let maximumBracketAmount = max - min;
      if (balance === 0) {
        taxableAmount = 0;
      } else if (balance < maximumBracketAmount) {
        taxableAmount = balance;
        balance = 0;
      } else {
        taxableAmount = maximumBracketAmount;
        balance = balance - maximumBracketAmount;
      }
    }
    return {
      ...bracket,
      taxableAmount,
      tax: taxableAmount * rate,
    };
  });

  return marginalRateData;
};
