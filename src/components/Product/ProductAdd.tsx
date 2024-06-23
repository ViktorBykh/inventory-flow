import React, { useState, useRef } from "react";
import { Product } from "../../types/Product";

interface Props {
  onAdd: (product: Product) => void;
}

export const ProductAdd: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct: Product = {
      _id: "",
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    onAdd(newProduct);
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
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
              alt="Shopping-Basket"
              src={`https://www.svgrepo.com/show/122327/add-to-shopping-basket.svg`}
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
                <label className="label">Name</label>
                <div className="control">
                  <input
                    ref={nameInputRef}
                    className="input"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price ($)</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="Enter price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Quantity</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    min="0"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
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
