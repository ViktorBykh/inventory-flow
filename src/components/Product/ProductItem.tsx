import React from "react";
import { Product } from "../../types/Product";
import { productImages } from "../../enums/productImages";
import { getImage } from "../../utils/getImage";

type Props = {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
}

export const ProductItem: React.FC<Props> = React.memo(
  ({ product, index, onEdit }) => (
    <div
      className="column is-one-quarter"
      style={{
        cursor: "pointer",
      }}
    >
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={getImage(productImages, index)} alt={product.name} />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="title is-4" data-testid="product-name">{product.name}</p>
            <p>
              <strong>{product.category}</strong>
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <div className="has-text-right">
              <button
                className="button is-primary"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);
