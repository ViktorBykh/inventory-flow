import React, { useState } from "react";
import { Order } from "../../types/Order";

type Props = {
  order: Order;
  onUpdate: (order: Order) => void;
  onCancel: () => void;
  onDelete: (orderId: string) => void;
};

export const OrderEdit: React.FC<Props> = ({
  order,
  onUpdate,
  onCancel,
  onDelete,
}) => {
  const [orderNumber, setOrderNumber] = useState(order.orderNumber);
  const [customerName, setCustomerName] = useState(order.customerName);
  const [orderDate, setOrderDate] = useState(
    new Date(order.orderDate).toISOString().split("T")[0]
  );
  const [totalCost, setTotalCost] = useState(order.totalCost);
  const [products, setProducts] = useState(order.products);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedOrder: Order = {
      ...order,
      orderNumber,
      customerName,
      orderDate: new Date(orderDate),
      totalCost: Number(totalCost),
      products,
    };
    onUpdate(updatedOrder);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        _id: "",
        name: "Empty name",
        category: "Empty category",
        price: 0,
        quantity: 0,
      },
    ]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Order</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="order-number">
                Order Number
              </label>
              <div className="control">
                <input
                  id="order-number"
                  className="input"
                  type="text"
                  value={orderNumber}
                  onChange={(event) => setOrderNumber(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="customer-name">
                Customer Name
              </label>
              <div className="control">
                <input
                  id="customer-name"
                  className="input"
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="order-date">
                Order Date
              </label>
              <div className="control">
                <input
                  id="order-date"
                  className="input"
                  type="date"
                  value={orderDate.toString().substring(0, 10)}
                  onChange={(event) =>
                    setOrderDate(
                      new Date(event.target.value).toISOString().split("T")[0]
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="total-cost">
                Total Cost ($)
              </label>
              <div className="control">
                <input
                  id="total-cost"
                  className="input"
                  type="number"
                  min="0"
                  step="0.5"
                  value={totalCost}
                  onChange={(event) => setTotalCost(Number(event.target.value))}
                  required
                />
              </div>
            </div>
            {products &&
              products.map((product, index) => (
                <div className="field" key={index}>
                  <div className="label">Product: {index + 1}</div>
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Product ID"
                        value={product._id}
                        onChange={(event) => {
                          const newProductId = event.target.value;
                          setProducts((prevProducts) => {
                            const updatedProducts = [...prevProducts];
                            updatedProducts[index] = {
                              ...product,
                              _id: newProductId,
                            };
                            return updatedProducts;
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={product.name}
                        onChange={(event) => {
                          const newName = event.target.value;
                          setProducts((prevProducts) => {
                            const updatedProducts = [...prevProducts];
                            updatedProducts[index] = {
                              ...product,
                              name: newName,
                            };
                            return updatedProducts;
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Category"
                        value={product.category}
                        onChange={(event) => {
                          const newCategory = event.target.value;
                          setProducts((prevProducts) => {
                            const updatedProducts = [...prevProducts];
                            updatedProducts[index] = {
                              ...product,
                              category: newCategory,
                            };
                            return updatedProducts;
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        placeholder="Price"
                        value={product.price}
                        onChange={(event) => {
                          const newPrice = Number(event.target.value);
                          setProducts((prevProducts) => {
                            const updatedProducts = [...prevProducts];
                            updatedProducts[index] = {
                              ...product,
                              price: newPrice,
                            };
                            return updatedProducts;
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(event) => {
                          const newQuantity = Number(event.target.value);
                          setProducts((prevProducts) => {
                            const updatedProducts = [...prevProducts];
                            updatedProducts[index] = {
                              ...product,
                              quantity: newQuantity,
                            };
                            return updatedProducts;
                          });
                        }}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      className="button is-danger is-small"
                      onClick={() => removeProduct(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            <div className="field">
              <div className="control">
                <button
                  className="button is-primary"
                  type="button"
                  onClick={addProduct}
                >
                  Add Product
                </button>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Save
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-text"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="control is-flex-grow-1">
                <button
                  className="button is-danger is-pulled-right"
                  onClick={() => onDelete(order._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
