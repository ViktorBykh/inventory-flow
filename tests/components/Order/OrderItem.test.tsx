import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { OrderItem } from "../../../src/components/Order/OrderItem";
import { Order } from "../../../src/types/Order";

describe("OrderItem", () => {
  const mockOrder: Order = {
    _id: "1",
    orderNumber: "12345",
    customerName: "John Doe",
    orderDate: new Date(),
    totalCost: 99.99,
    products: [
      {
        _id: "p1",
        name: "Product 1",
        category: "Category 1",
        quantity: 1,
        price: 10.0,
      },
      {
        _id: "p2",
        name: "Product 2",
        category: "Category 2",
        quantity: 2,
        price: 20.0,
      },
    ],
  };
  const mockIndex: number = 0;
  let mockOnEdit: jest.Mock<any, any>;

  beforeEach(() => {
    mockOnEdit = jest.fn();
  });

  it("should render order details and edit button", () => {
    render(
      <OrderItem order={mockOrder} index={mockIndex} onEdit={mockOnEdit} />
    );

    expect(
      screen.getByText(`Order Number: ${mockOrder.orderNumber}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element?.textContent === "Customer: John Doe"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element?.textContent === "Total Cost: $99.99"
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
  });

  it("should call onEdit function when edit button is clicked", () => {
    render(
      <OrderItem order={mockOrder} index={mockIndex} onEdit={mockOnEdit} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("should display the correct image", () => {
    render(
      <OrderItem order={mockOrder} index={mockIndex} onEdit={mockOnEdit} />
    );

    const image = screen.getByAltText(`Order ${mockOrder.orderNumber}`);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain(
      "https://www.svgrepo.com/show/80543/shopping-cart-outline.svg"
    );
  });

  it("should toggle dropdown when products button is clicked", () => {
    render(
      <OrderItem order={mockOrder} index={mockIndex} onEdit={mockOnEdit} />
    );

    const productsButton = screen.getByRole("button", { name: /Products/i });
    
    fireEvent.click(productsButton);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("should display 'No products yet' when order has no products", () => {
    const emptyOrder = { ...mockOrder, products: [] };
    render(
      <OrderItem order={emptyOrder} index={mockIndex} onEdit={mockOnEdit} />
    );

    const productsButton = screen.getByRole("button", { name: /Products/i });
    fireEvent.click(productsButton);

    expect(screen.getByText("No products yet")).toBeInTheDocument();
  });

  it("should display the correct background color", () => {
    render(
      <OrderItem order={mockOrder} index={mockIndex} onEdit={mockOnEdit} />
    );

    const image = screen.getByAltText(`Order ${mockOrder.orderNumber}`);
    expect(image).toHaveStyle("background-color: #FFCDD2");
  });
});
