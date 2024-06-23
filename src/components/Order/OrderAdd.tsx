import React, { useRef, useState } from "react";
import { Order } from "../../types/Order";
import { getProductById } from "../../api/products";
import { Product } from "../../types/Product";

type Props = {
  onAdd: (order: Order) => void;
};

const formatDate = (date: Date) => date.toISOString().substring(0, 10);

export const OrderAdd: React.FC<Props> = ({ onAdd }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState(formatDate(new Date()));
  const [totalCost, setTotalCost] = useState("");

  const [productById, setProductById] = useState<Product>({
    _id: "",
    name: "Empty name",
    category: "Empty category",
    price: 0,
    quantity: 1,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    getProductById(productById._id)
      .then((response) => {
        const newOrder: Order = {
          _id: "",
          orderNumber,
          customerName,
          orderDate: new Date(orderDate),
          totalCost: parseFloat(totalCost),
          products: [
            {
              _id: productById._id,
              name: productById.name,
              category: productById.category,
              price: productById.price,
              quantity: productById.quantity,
            },
          ],
        };
        if (response && response.length > 0) {
          setProductById({
            ...productById,
            ...response,
          });
          newOrder.products[0] = {
            ...productById,
            ...response[0],
          };
        }
        onAdd(newOrder);
      })
      .finally(() => {
        setOrderNumber("");
        setCustomerName("");
        setOrderDate(formatDate(new Date()));
        setTotalCost("");
        setProductById({
          _id: "",
          name: "Empty name",
          category: "Empty category",
          price: 0,
          quantity: 1,
        });
      });
  };

  const handleCardClick = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  return (
    <div className="column is-one-quarter">
      <div className="card">
        <div
          className="card-image"
          style={{
            margin: "auto",
            width: "30%",
            height: "30%",
          }}
        >
          <figure className="image is-4by3">
            <img
              alt="Shopping-Cart"
              src={`https://www.svgrepo.com/show/150312/shopping-cart-moving-symbol.svg`}
              style={{
                marginTop: "30px",
                cursor: "pointer",
              }}
              onClick={handleCardClick}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Order Number</label>
                <div className="control">
                  <input
                    ref={nameInputRef}
                    className="input"
                    type="text"
                    placeholder="Enter order number"
                    value={orderNumber}
                    onChange={(event) => setOrderNumber(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Customer Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="orderDateInput">
                  Order Date
                </label>
                <div className="control">
                  <input
                    id="orderDateInput"
                    className="input"
                    type="date"
                    value={orderDate}
                    onChange={(event) => setOrderDate(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Total Cost ($)</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="Enter total cost"
                    value={totalCost}
                    onChange={(event) => setTotalCost(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Product ID</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter product ID"
                    value={productById._id}
                    onChange={(event) =>
                      setProductById((prevState) => ({
                        ...prevState,
                        _id: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="has-text-right">
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
