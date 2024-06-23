import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ProductAdd } from "../../../src/components/Product/ProductAdd";

describe("ProductAdd", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input fields and add button", () => {
    render(<ProductAdd onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter category")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter quantity")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should call onAdd function with correct product when form is submitted", async () => {
    render(<ProductAdd onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Enter name"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter category"), {
      target: { value: "Test Category" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter price"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter quantity"), {
      target: { value: "10" },
    });
    fireEvent.submit(screen.getByPlaceholderText("Enter name"));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({
        _id: "",
        name: "Test Product",
        category: "Test Category",
        price: 100,
        quantity: 10,
      });
    });
  });

  it("should clear input fields after form submission", () => {
    render(<ProductAdd onAdd={mockOnAdd} />);

    const nameInput = screen.getByPlaceholderText("Enter name");
    const categoryInput = screen.getByPlaceholderText("Enter category");

    fireEvent.change(nameInput, { target: { value: "Test Product" } });
    fireEvent.change(categoryInput, { target: { value: "Test Category" } });
    fireEvent.submit(nameInput);

    expect(nameInput).toHaveValue("");
    expect(categoryInput).toHaveValue("");
  });

  it("should focus name input field when card image is clicked", () => {
    render(<ProductAdd onAdd={mockOnAdd} />);

    const nameInput = screen.getByPlaceholderText("Enter name");
    const cardImage = screen.getByAltText("Shopping-Basket");

    fireEvent.click(cardImage);
    expect(nameInput).toHaveFocus();
  });
});
