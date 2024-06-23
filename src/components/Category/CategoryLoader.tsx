import React from "react";

export const CategoryLoader: React.FC = () => (
  <div className="columns is-multiline">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="column is-one-third">
        <div className="card" data-testid="skeleton-card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img className="is-skeleton" alt="" />
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
            <p
              className="is-4 is-skeleton"
              data-testid="skeleton-text"
              style={{ width: "40%" }}
            >
              ""
            </p>
            <div className="has-text-right">
              <button className="button is-primary is-loading" disabled>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
