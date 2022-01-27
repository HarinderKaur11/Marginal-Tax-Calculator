import React, { useState } from "react";
import { TaxBracketTable } from "../tax-bracket-table/tax-bracket-table";
import { UserInput } from "../user-input/user-input";
import axios, { AxiosResponse } from "axios";
import { AppState, MarginalRateData, TaxBracket } from "./tax-calculator.model";
import "./tax-calculator.css";
import {
  getMarginalTaxRateObject,
  getRoundedNumberForDisplay,
} from "./tax-calculator.helpers";

export const TaxCalculator = () => {
  const [taxBrackets, setTaxBrackets] = useState<MarginalRateData[]>([]);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);
  const [appState, setAppState] = useState<AppState>("INITIAL");
  const [totalTaxPayable, setTotalTaxPayable] = useState<number>(0);

  const calculateEffectiveTax = (
    marginalRateData: MarginalRateData[],
    salary: number
  ) => {
    let totalPayableTax = 0;
    marginalRateData.forEach((data) => {
      totalPayableTax += data.tax;
    });
    setTotalTaxPayable(getRoundedNumberForDisplay(totalPayableTax));
    setEffectiveTaxRate(getRoundedNumberForDisplay(totalPayableTax / salary));
  };

  const handleGetTaxBrackets = (salary: number, year: number) => {
    setAppState("FETCHING");
    axios
      .get(`http://localhost:5000/tax-calculator/brackets/${year}`)
      .then((response: AxiosResponse) => {
        const taxBracketsResponse: TaxBracket[] = response.data.tax_brackets;
        const sortedResponse = taxBracketsResponse.sort(
          (a, b) => a.min - b.min
        );
        calculateRate(salary, sortedResponse);
      })
      .catch(function (error) {
        setAppState("ERROR");
        console.log(error);
      });
  };

  const calculateRate = (salary: number, sortedResponse: TaxBracket[]) => {
    const marginalRateData = getMarginalTaxRateObject(salary, sortedResponse);
    setTaxBrackets(marginalRateData);
    calculateEffectiveTax(marginalRateData, salary);
    setAppState("SUCCESS");
  };

  return (
    <>
      <h1 className="c-tax-calculator--heading">
        Marginal Tax Rate Calculator
      </h1>
      <UserInput handleSubmit={handleGetTaxBrackets} />
      {appState === "SUCCESS" && (
        <>
          {taxBrackets.length > 0 && (
            <TaxBracketTable tableData={taxBrackets} />
          )}
          <h3>Total Payable Tax is: {totalTaxPayable}</h3>
          <h3>Your effective Tax rate is: {effectiveTaxRate}</h3>
        </>
      )}
      {appState === "FETCHING" && <h4>Fetching...</h4>}
      {appState === "ERROR" && (
        <h4>Sorry :( Something went wrong, please try again!</h4>
      )}
    </>
  );
};
