import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../src/api/orders";
import { Order } from "../../src/types/Order";
import fetchMock from "jest-fetch-mock";
import { BASE_URL } from "../../src/utils/fetchClient";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("getOrders fetches orders successfully", () => {
  const mockOrders: Order[] = [
    {
      _id: "1",
      orderNumber: "001",
      customerName: "John Doe",
      orderDate: new Date("2023-01-01"),
      totalCost: 100,
      products: [],
    },
  ];
  fetchMock.mockResponseOnce(
    JSON.stringify(
      mockOrders.map((order) => ({
        ...order,
        orderDate: order.orderDate.toISOString(),
      }))
    )
  );

  return getOrders().then((orders) => {
    orders.forEach((order) => {
      order.orderDate = new Date(order.orderDate);
    });
    expect(orders).toEqual(mockOrders);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/orders`, {
      method: "GET",
    });
  });
});

test("getOrderById fetches a single order by ID", () => {
  const mockOrder: Order = {
    _id: "1",
    orderNumber: "001",
    customerName: "John Doe",
    orderDate: new Date("2023-01-01"),
    totalCost: 100,
    products: [],
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockOrder));

  return getOrderById("1").then((orderById) => {
    orderById.orderDate = new Date(orderById.orderDate);
    expect(orderById).toEqual(mockOrder);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/orders/1`, {
      method: "GET",
    });
  });
});

test("createOrder creates a new order", () => {
  const newOrder = {
    orderNumber: "002",
    customerName: "Jane Doe",
    orderDate: new Date("2023-01-02"),
    totalCost: 200,
    products: [],
  };
  const mockResponse: Order = { _id: "2", ...newOrder };
  fetchMock.mockResponseOnce(
    JSON.stringify({
      ...mockResponse,
      orderDate: mockResponse.orderDate.toISOString(),
    })
  );

  return createOrder(newOrder).then((createdOrder) => {
    createdOrder.orderDate = new Date(createdOrder.orderDate);
    expect(createdOrder).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newOrder),
    });
  });
});

test("updateOrder updates an existing order", () => {
  const updatedOrder: Order = {
    _id: "1",
    orderNumber: "003",
    customerName: "John Smith",
    orderDate: new Date("2023-01-03"),
    totalCost: 300,
    products: [],
  };
  fetchMock.mockResponseOnce(JSON.stringify(updatedOrder));

  return updateOrder(updatedOrder).then((orderFromDb) => {
    orderFromDb.orderDate = new Date(orderFromDb.orderDate);
    expect(orderFromDb).toEqual(updatedOrder);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/orders/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        orderNumber: "003",
        customerName: "John Smith",
        orderDate: new Date("2023-01-03"),
        totalCost: 300,
        products: [],
      }),
    });
  });
});

test("deleteOrder deletes an order by ID", () => {
  fetchMock.mockResponseOnce(JSON.stringify({}));

  return deleteOrder("1").then((result) => {
    expect(result).toEqual({});
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/orders/1`, {
      method: "DELETE",
    });
  });
});
