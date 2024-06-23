import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { OrderList } from "../../../src/components/Order/OrderList";
import { getOrders, createOrder, updateOrder } from "../../../src/api/orders";
import { BrowserRouter } from "react-router-dom";
window.React = React;

jest.mock("../../../src/api/orders", () => ({
  createOrder: jest.fn(),
  deleteOrder: jest.fn(),
  getOrders: jest.fn(),
  updateOrder: jest.fn(),
}));

let mockOrders = [
  { _id: "1", orderNumber: "Order 1" },
  { _id: "2", orderNumber: "Order 2" },
];

describe("OrderList", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should render loading state while fetching orders", () => {
    (getOrders as jest.Mock).mockResolvedValueOnce(mockOrders);
    render(
      <BrowserRouter>
        <OrderList />
      </BrowserRouter>
    );

    expect(screen.getByText("Order List")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(5);
    expect(screen.getAllByTestId("skeleton-text")).toHaveLength(15);

    return waitFor(
      () => {
        expect(screen.getByText(/Order Number:\s*Order 1/)).toBeInTheDocument();
        expect(screen.getByText(/Order Number:\s*Order 2/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should handle error while fetching orders", () => {
    (getOrders as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch orders")
    );

    render(
      <BrowserRouter>
        <OrderList />
      </BrowserRouter>
    );

    expect(screen.getByText("Order List")).toBeInTheDocument();

    return waitFor(
      () => {
        expect(
          screen.getByText("Error while fetching orders")
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should add a new order", () => {
    const orderNumber = "New Order";
    const newOrder = { _id: "3", orderNumber };

    (createOrder as jest.Mock).mockResolvedValueOnce(newOrder);
    (getOrders as jest.Mock).mockResolvedValueOnce([...mockOrders, newOrder]);

    render(
      <BrowserRouter>
        <OrderList />
      </BrowserRouter>
    );

    return waitFor(
      () => {
        expect(screen.getByText(/Order Number:\s*Order 1/)).toBeInTheDocument();
        expect(screen.getByText(/Order Number:\s*Order 2/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    const inputElement = screen.getByPlaceholderText("Enter order number");
    fireEvent.change(inputElement, { target: { value: orderNumber } });

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    return waitFor(
      () => {
        expect(
          screen.getByText(/Order Number:\s*New Order/)
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should update an order", () => {
    const updatedOrder = { _id: "1", orderNumber: "Updated Order" };

    (updateOrder as jest.Mock).mockResolvedValueOnce(updatedOrder);
    (getOrders as jest.Mock).mockResolvedValueOnce(mockOrders);

    render(
      <BrowserRouter>
        <OrderList />
      </BrowserRouter>
    );

    return waitFor(
      () => {
        expect(screen.getByText(/Order Number:\s*Order 1/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue("Order 1");
    fireEvent.change(inputElement, {
      target: { value: "Updated Order" },
    });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    return waitFor(
      () => {
        expect(screen.getByDisplayValue("Updated Order")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
