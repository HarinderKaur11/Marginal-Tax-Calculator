import React from "react";
import { render, screen } from "@testing-library/react";
import { TaxBracketTable } from "./tax-bracket-table";

describe("Tax Bracket Table", () => {
  test("should render the heading element", () => {
    const mockTableTabledata = [
      { min: 0, max: 100, tax: 13, rate: 0.13, taxableAmount: 100000 },
      { min: 1000, max: 1000, tax: 13, rate: 0.13, taxableAmount: 100000 },
    ];
    render(<TaxBracketTable tableData={mockTableTabledata} />);
    expect(screen.getByText("Tax Bracket")).toBeInTheDocument();
    expect(screen.getByText("Tax Rate")).toBeInTheDocument();
    expect(screen.getByText("Taxable Amount")).toBeInTheDocument();
    expect(screen.getByText("Taxable Amount")).toBeInTheDocument();
    expect(screen.getByText("0 - 100")).toBeInTheDocument();
  });

  test("should display tax bracket correctly if max is undefined", () => {
    const mockTableTabledata = [
      { min: 100000, tax: 13, rate: 0.13, taxableAmount: 100000 },
    ];
    render(<TaxBracketTable tableData={mockTableTabledata} />);
    expect(screen.getByText("100000 and above")).toBeInTheDocument();
  });

  test("should render all table data correctly", () => {
    const mockTableTabledata = [
      { min: 100000, tax: 13, rate: 0.13, taxableAmount: 100000 },
      { min: 0, max: 100, tax: 13, rate: 0.13, taxableAmount: 100000 },
    ];
    render(<TaxBracketTable tableData={mockTableTabledata} />);
    expect(screen.getByText("0 - 100")).toBeInTheDocument();
    expect(screen.getByText("100000 and above")).toBeInTheDocument();
  });
});
