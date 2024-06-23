import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ProductItem } from "../../../src/components/Product/ProductItem";
import { Product } from "../../../src/types/Product";

describe("ProductItem", () => {
  const mockProduct: Product = {
    _id: "p1",
    name: "Product 1",
    category: "Category 1",
    quantity: 1,
    price: 10.0,
  };
  const mockIndex: number = 0;
  let mockOnEdit: jest.Mock<any, any>;

  beforeEach(() => {
    mockOnEdit = jest.fn();
  });

  it("should render product details and edit button", () => {
    render(
      <ProductItem
        product={mockProduct}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `Price: $${mockProduct.price}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Quantity: ${mockProduct.quantity}`
      )
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
  });

  it("should call onEdit function when edit button is clicked", () => {
    render(
      <ProductItem
        product={mockProduct}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
  });

  it("should display the correct image", () => {
    render(
      <ProductItem
        product={mockProduct}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain(
      "https://images.unsplash.com/photo-1637503434402-0491c896566b"
    );
  });
});
