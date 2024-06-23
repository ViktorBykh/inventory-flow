import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryAdd } from "../../../src/components/Category/CategoryAdd";

describe("CategoryAdd", () => {
  it("should render input field and add button", () => {
    const mockOnAdd = jest.fn();
    render(<CategoryAdd onAdd={mockOnAdd} />);

    expect(
      screen.getByPlaceholderText("Enter category name")
    ).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should call onAdd function with correct category when form is submitted", () => {
    const mockOnAdd = jest.fn();
    render(<CategoryAdd onAdd={mockOnAdd} />);

    const inputElement = screen.getByPlaceholderText("Enter category name");
    fireEvent.change(inputElement, { target: { value: "New Category" } });
    fireEvent.submit(inputElement);

    expect(mockOnAdd).toHaveBeenCalledWith({
      _id: "",
      name: "New Category",
    });
  });

  it("should clear input field after form submission", () => {
    const mockOnAdd = jest.fn();
    render(<CategoryAdd onAdd={mockOnAdd} />);

    const inputElement = screen.getByPlaceholderText("Enter category name");
    fireEvent.change(inputElement, { target: { value: "New Category" } });
    fireEvent.submit(inputElement);

    expect(inputElement).toHaveValue("");
  });

  it("should focus input field when card image is clicked", () => {
    render(<CategoryAdd onAdd={() => {}} />);

    const inputElement = screen.getByPlaceholderText("Enter category name");
    const cardImage = screen.getByAltText("Add-category");
    fireEvent.click(cardImage);

    expect(inputElement).toHaveFocus();
  });
});
