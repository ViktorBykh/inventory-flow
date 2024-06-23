import React from "react";
import { Category } from "../../types/Category";
import { categoryImages } from "../../enums/categoryImages";
import { getImage } from "../../utils/getImage";
import { getColor } from "../../utils/getColor";

interface Props {
  category: Category;
  index: number;
  onEdit: () => void;
}

export const CategoryItem: React.FC<Props> = ({ category, index, onEdit }) => (
  <div className="column is-one-third" style={{ cursor: "pointer" }}>
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={getImage(categoryImages, index)}
            alt={category.name}
            style={{
              padding: "90px",
              backgroundColor: getColor(index),
            }}
          />
        </figure>
      </div>
      <div
        className="
        card-content 
        is-flex
        is-justify-content-space-between
        is-align-items-center
        "
      >
        <div>
          <p className="title is-4">{category.name}</p>
        </div>
        <div className="buttons has-addons is-centered">
          <button className="button is-primary" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
);
