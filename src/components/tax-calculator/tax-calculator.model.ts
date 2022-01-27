export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type MarginalRateData = TaxBracket & {
  tax: number;
  taxableAmount: number;
};

export type AppState = "INITIAL" | "FETCHING" | "SUCCESS" | "ERROR";
