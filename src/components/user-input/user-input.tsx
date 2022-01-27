import React, { useState } from "react";
import { listOfFinancialYearsAvailable } from "./fiscal-years.config";
import "./user-input.css";

interface UserInputProps {
  handleSubmit: (salary: number, year: number) => void;
}

export const UserInput = ({ handleSubmit }: UserInputProps) => {
  const [salary, setSalary] = useState<number>();
  const [year, setYear] = useState<number>(listOfFinancialYearsAvailable[0]);

  const handleInputChange = (event: any) => {
    const { target } = event;
    const { value, name } = target;
    if (name === "salary-input") {
      setSalary(value);
    }
    if (name === "year-input") {
      setYear(value);
    }
  };

  const handleUserInput = (e: any) => {
    e.preventDefault();
    if (salary && year) {
      handleSubmit(salary, year);
    }
  };

  return (
    <div className="c-user-input">
      <p className="c-user-input--heading">
        Please enter your annual salary and the fiscal year
      </p>
      <div className="c-user-input--inputs">
        <div className="c-user-input--wrapper">
          <label>Salary</label>
          <input
            className="c-user-input--input"
            type="number"
            id="salary"
            value={salary || ""}
            name="salary-input"
            onChange={(e) => handleInputChange(e)}
            data-testid="input-salary"
          />
        </div>
        <div className="c-user-input--wrapper">
          <label>Year</label>
          <select
            name="year-input"
            id="years"
            className="c-user-input--input"
            value={year}
            onChange={(e) => handleInputChange(e)}
            data-testid="input-year"
          >
            {listOfFinancialYearsAvailable.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="c-user-input--input c-user-input--button"
        onClick={(e) => handleUserInput(e)}
        disabled={!salary || !year}
      >
        Calculate
      </button>
    </div>
  );
};
