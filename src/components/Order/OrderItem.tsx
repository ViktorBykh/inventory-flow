import React, { useState, useRef, useEffect } from "react";
import { Order } from "../../types/Order";
import { getColor } from "../../utils/getColor";

type Props = {
  order: Order;
  index: number;
  onEdit: (order: Order) => void;
};

export const OrderItem: React.FC<Props> = React.memo(
  ({ order, index, onEdit }) => {
    const [dropdownId, setDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleToggleDropdown = (orderId: string) => {
      setDropdownId((prevId) => (prevId === orderId ? null : orderId));
    };

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          buttonRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setDropdownId(null);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef, buttonRef]);

    return (
      <div
        key={order._id}
        className="column is-one-quarter"
        style={{ cursor: "pointer" }}
      >
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img
                src={`https://www.svgrepo.com/show/80543/shopping-cart-outline.svg`}
                alt={`Order ${order.orderNumber}`}
                style={{ padding: "60px", backgroundColor: getColor(index) }}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <p className="title is-4">Order Number: {order.orderNumber}</p>
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Cost:</strong> ${order.totalCost}
              </p>
              <div className="is-flex is-justify-content-space-between">
                <div
                  ref={dropdownRef}
                  className={`dropdown ${
                    dropdownId === order._id && "is-active"
                  }`}
                >
                  <div
                    className="dropdown-trigger"
                    onClick={() => handleToggleDropdown(order._id)}
                  >
                    <button
                      ref={buttonRef}
                      className="button"
                      aria-haspopup="true"
                      aria-controls={`dropdown-menu-${index}`}
                    >
                      <span>Products</span>
                      <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div
                    className="dropdown-menu"
                    id={`dropdown-menu-${index}`}
                    role="menu"
                  >
                    {order.products && order.products.length !== 0 ? (
                      <div className="dropdown-content">
                        {order.products.map((product, index) => (
                          <React.Fragment key={index}>
                            <a href="#/" className="dropdown-item">
                              <p className="title is-6">{product.name}</p>
                              <p>
                                <strong>Category:</strong> {product.category}
                              </p>
                              <p>
                                <strong>Quantity:</strong> {product.quantity}
                              </p>
                              <p>
                                <strong>Price:</strong> ${product.price}
                              </p>
                            </a>
                            {index < order.products.length - 1 && (
                              <hr className="dropdown-divider" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="dropdown-content">
                        <a href="#/" className="dropdown-item">
                          No products yet
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="has-text-right">
                  <button
                    className="button is-primary"
                    onClick={() => onEdit(order)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
