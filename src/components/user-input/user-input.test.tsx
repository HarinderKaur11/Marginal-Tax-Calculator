import React from "react";
import { render, screen } from "@testing-library/react";
import { UserInput } from "./user-input";

describe("User Input", () => {
  test("should render input and select elements and the button", () => {
    const handleClick = jest.fn();
    render(<UserInput handleSubmit={handleClick} />);
    const inputEl = screen.getByTestId("input-salary");
    const selectEl = screen.getByTestId("input-year");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "number");
    expect(selectEl).toBeInTheDocument();
    const button = screen.getByText("Calculate");
    expect(button).toBeInTheDocument();
  });
});
