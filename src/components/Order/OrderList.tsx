import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../../api/orders";
import { Order } from "../../types/Order";
import { OrderItem } from "./OrderItem";
import { OrderAdd } from "./OrderAdd";
import { OrderEdit } from "./OrderEdit";
import { OrderLoader } from "./OrderLoader";
import { wait } from "../../utils/wait";
import { Navigation } from "../Navigation";

export const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const title = "Order List";

  wait(5000).then(() => setErrorMessage(""));

  useEffect(() => {
    setLoading(true);
    wait(1000).then(() =>
      getOrders()
        .then((response: any) => {
          return response.message === "No orders yet"
            ? setOrders([])
            : setOrders([...response]);
        })
        .catch(() => setErrorMessage("Error while fetching orders"))
        .finally(() => setLoading(false))
    );
  }, []);

  const handleAddOrder = (newOrder: Order) => {
    createOrder(newOrder)
      .then((response) => {
        const newOrderId = response._id;
        if (orders.length === 0) {
          setOrders([{ ...newOrder, _id: newOrderId }]);
          return;
        }
        setOrders([...orders, { ...newOrder, _id: newOrderId }]);
      })
      .catch(() => setErrorMessage("Error while adding order"))
      .finally(() => setEditingOrder(null));
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    updateOrder(updatedOrder)
      .then(() =>
        setOrders(
          orders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        )
      )
      .catch(() => setErrorMessage("Error while updating order"))
      .finally(() => setEditingOrder(null));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order._id !== orderId));
    deleteOrder(orderId)
      .catch(() => setErrorMessage("Error while deleting order"))
      .finally(() => setEditingOrder(null));
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <Navigation title={title} />

          {errorMessage && (
            <div className="title has-text-danger">{errorMessage}</div>
          )}

          {loading && <OrderLoader />}

          <div className="columns is-multiline">
            {!loading && !errorMessage && (
              <OrderAdd onAdd={handleAddOrder} />
            )}
            
            {!loading &&
              orders.length > 0 &&
              orders.map((order, index) => (
                <OrderItem
                  key={`${order._id}-${index}`}
                  order={order}
                  index={index}
                  onEdit={() => setEditingOrder(order)}
                />
              ))}
          </div>

          {editingOrder && (
            <OrderEdit
              order={editingOrder}
              onUpdate={handleUpdateOrder}
              onCancel={() => setEditingOrder(null)}
              onDelete={handleDeleteOrder}
            />
          )}
        </div>
      </section>
    </>
  );
};
