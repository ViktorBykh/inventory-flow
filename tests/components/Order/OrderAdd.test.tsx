import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { OrderAdd } from "../../../src/components/Order/OrderAdd";

describe("OrderAdd", () => {
  it("should render input fields and add button", () => {
    const mockOnAdd = jest.fn();
    render(<OrderAdd onAdd={mockOnAdd} />);

    expect(
      screen.getByPlaceholderText("Enter order number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter customer name")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter total cost")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter product ID")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should focus order number input field when card image is clicked", () => {
    render(<OrderAdd onAdd={() => {}} />);

    const orderNumberInput = screen.getByPlaceholderText("Enter order number");
    const cardImage = screen.getByAltText("Shopping-Cart");
    fireEvent.click(cardImage);

    expect(orderNumberInput).toHaveFocus();
  });
});
