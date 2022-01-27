import React from "react";
import { render, screen } from "@testing-library/react";
import { TaxCalculator } from "./tax-calculator";
import {
  getMarginalTaxRateObject,
  getRoundedNumberForDisplay,
} from "./tax-calculator.helpers";
import { TaxBracket } from "./tax-calculator.model";

describe("tax-calculator", () => {
  test("should render the heading element", () => {
    render(<TaxCalculator />);
    const heading = screen.getByText("Marginal Tax Rate Calculator");
    expect(heading).toBeInTheDocument();
  });

  test("should round off correctly to 2 decimal places for display", () => {
    const result1 = getRoundedNumberForDisplay(17.1234556777);
    const result2 = getRoundedNumberForDisplay(17.1555555);

    expect(result1).toEqual(17.12);
    expect(result2).toEqual(17.16);
  });

  test("should return marginal tax rates per bracket", () => {
    const mockBrackets = [
      { max: 47630, min: 0, rate: 0.15 },
      { max: 95259, min: 47630, rate: 0.205 },
      { max: 147667, min: 95259, rate: 0.26 },
      { max: 210371, min: 147667, rate: 0.29 },
      { min: 210371, rate: "0.33" },
    ] as TaxBracket[];
    const actualResult = getMarginalTaxRateObject(1000, mockBrackets);

    const expectedResult = [
      { max: 47630, min: 0, rate: 0.15, taxableAmount: 1000, tax: 150 },
      { max: 95259, min: 47630, rate: 0.205, taxableAmount: 0, tax: 0 },
      { max: 147667, min: 95259, rate: 0.26, taxableAmount: 0, tax: 0 },
      { max: 210371, min: 147667, rate: 0.29, taxableAmount: 0, tax: 0 },
      { min: 210371, rate: "0.33", taxableAmount: 0, tax: 0 },
    ];

    expect(actualResult).toEqual(expectedResult);
  });
});
