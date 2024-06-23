import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ProductEdit } from "../../../src/components/Product/ProductEdit";
import { Product } from "../../../src/types/Product";

describe("ProductEdit", () => {
  const mockProduct: Product = {
    _id: "p1",
    name: "Product 1",
    category: "Category 1",
    price: 50,
    quantity: 1,
  };
  let mockOnUpdate: jest.Mock<any, any>;
  let mockOnCancel: jest.Mock<any, any>;
  let mockOnDelete: jest.Mock<any, any>;

  beforeEach(() => {
    mockOnUpdate = jest.fn();
    mockOnCancel = jest.fn();
    mockOnDelete = jest.fn();
  });

  it("should render input fields and buttons", () => {
    render(
      <ProductEdit
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  it("should call onUpdate with the correct product when form is submitted", () => {
    render(
      <ProductEdit
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const nameInput = screen.getByLabelText("Name");
    const categoryInput = screen.getByLabelText("Category");
    const priceInput = screen.getByLabelText("Price");
    const quantityInput = screen.getByLabelText("Quantity");

    fireEvent.change(nameInput, { target: { value: "Updated Product" } });
    fireEvent.change(categoryInput, { target: { value: "Updated Category" } });
    fireEvent.change(priceInput, { target: { value: "100" } });
    fireEvent.change(quantityInput, { target: { value: "5" } });
    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockProduct,
      name: "Updated Product",
      category: "Updated Category",
      price: 100,
      quantity: 5,
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(
      <ProductEdit
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should call onDelete with the correct product ID when delete button is clicked", () => {
    render(
      <ProductEdit
        product={mockProduct}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct._id);
  });
});
