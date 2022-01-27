import React from "react";
import { MarginalRateData } from "../tax-calculator/tax-calculator.model";
import "./tax-bracket-table.css";

interface TaxBracketTableProps {
  tableData: MarginalRateData[];
}

export const TaxBracketTable = ({ tableData }: TaxBracketTableProps) => {
  return (
    <table>
      <thead className="c-tax-bracket-table--heading-row">
        <tr>
          <th>Tax Bracket</th>
          <th>Tax Rate</th>
          <th>Taxable Amount</th>
          <th>Tax</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((tableRowData: MarginalRateData) => {
          return (
            <tr key={tableRowData.min}>
              <td>
                {tableRowData.max
                  ? `${tableRowData.min} - ${tableRowData.max}`
                  : `${tableRowData.min} and above`}
              </td>
              <td>{tableRowData.rate}</td>
              <td>{tableRowData.taxableAmount}</td>
              <td>{tableRowData.tax.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
