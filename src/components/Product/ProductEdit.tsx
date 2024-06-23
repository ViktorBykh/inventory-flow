import React, { useState } from "react";
import { Product } from "../../types/Product";

type Props = {
  product: Product;
  onUpdate: (product: Product) => void;
  onCancel: () => void;
  onDelete: (productId: string) => void;
};

export const ProductEdit: React.FC<Props> = ({
  product,
  onUpdate,
  onCancel,
  onDelete,
}) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedProduct = { ...product, name, category, price, quantity };
    onUpdate(updatedProduct);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Product</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="product-name">
                Name
              </label>
              <div className="control">
                <input
                  id="product-name"
                  className="input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="product-category">
                Category
              </label>
              <div className="control">
                <input
                  id="product-category"
                  className="input"
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="product-price">
                Price
              </label>
              <div className="control">
                <input
                  id="product-price"
                  className="input"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="product-quantity">
                Quantity
              </label>
              <div className="control">
                <input
                  id="product-quantity"
                  className="input"
                  type="number"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  required
                />
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
                  data-testid="delete-product"
                  onClick={() => onDelete(product._id)}
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
