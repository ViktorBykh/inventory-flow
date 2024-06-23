import { Order } from "../types/Order";
import { client } from "../utils/fetchClient";

export const getOrders = (): Promise<Order[]> => {
  return client.get<Order[]>("/orders");
};

export const getOrderById = (orderId: string) => {
  return client.get<Order>(`/orders/${orderId}`);
};

export const createOrder = ({
  orderNumber,
  customerName,
  orderDate,
  totalCost,
  products,
}: Omit<Order, "_id">) => {
  return client.post<Order>("/orders", {
    orderNumber,
    customerName,
    orderDate,
    totalCost,
    products,
  });
};

export const updateOrder = ({
  _id,
  orderNumber,
  customerName,
  orderDate,
  totalCost,
  products,
}: Order) => {
  return client.put<Order>(`/orders/${_id}`, {
    orderNumber,
    customerName,
    orderDate,
    totalCost,
    products,
  });
};

export const deleteOrder = (orderId: string) => {
  return client.delete(`/orders/${orderId}`);
};
