import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { OrderEdit } from "../../../src/components/Order/OrderEdit";
import { Order } from "../../../src/types/Order";

describe("OrderEdit", () => {
  const mockOrder: Order = {
    _id: "1",
    orderNumber: "12345",
    customerName: "John Doe",
    orderDate: new Date("2023-06-01"),
    totalCost: 100.5,
    products: [
      {
        _id: "p1",
        name: "Product 1",
        category: "Category 1",
        price: 50,
        quantity: 1,
      },
      {
        _id: "p2",
        name: "Product 2",
        category: "Category 2",
        price: 25,
        quantity: 2,
      },
    ],
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
      <OrderEdit
        order={mockOrder}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByLabelText("Order Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Customer Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Order Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Total Cost ($)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Product/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Remove/i)).toHaveLength(
      mockOrder.products.length
    );
  });

  it("should call onUpdate with the correct order when form is submitted", () => {
    render(
      <OrderEdit
        order={mockOrder}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const orderNumberInput = screen.getByLabelText("Order Number");
    const customerNameInput = screen.getByLabelText("Customer Name");
    const totalCostInput = screen.getByLabelText("Total Cost ($)");

    fireEvent.change(orderNumberInput, { target: { value: "54321" } });
    fireEvent.change(customerNameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(totalCostInput, { target: { value: "200.5" } });
    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockOrder,
      orderNumber: "54321",
      customerName: "Jane Doe",
      totalCost: 200.5,
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(
      <OrderEdit
        order={mockOrder}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should call onDelete with the correct order ID when delete button is clicked", () => {
    render(
      <OrderEdit
        order={mockOrder}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(mockOnDelete).toHaveBeenCalledWith(mockOrder._id);
  });

  it("should add a new product when add product button is clicked", () => {
    render(
      <OrderEdit
        order={mockOrder}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Product/i }));
    expect(screen.getAllByText(/Remove/i)).toHaveLength(
      mockOrder.products.length + 1
    );
  });

  it("should remove a product when remove button is clicked", () => {
    render(
      <OrderEdit
        order={mockOrder}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const removeButtons = screen.getAllByText(/Remove/i);
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByText(/Remove/i)).toHaveLength(
      mockOrder.products.length - 1
    );
  });
});
