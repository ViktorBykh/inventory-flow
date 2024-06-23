import React, { useRef, useState } from "react";
import { Category } from "../../types/Category";

type Props = {
  onAdd: (category: Category) => void;
};

export const CategoryAdd: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCategory: Category = {
      _id: "",
      name
    };
    onAdd(newCategory);
    setName("");
  };

  const handleCardClick = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              alt="Add-category"
              src={`https://www.svgrepo.com/show/521272/add-category.svg`}
              style={{
                padding: "90px",
                cursor: "pointer",
              }}
              onClick={handleCardClick}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <form
              onSubmit={handleSubmit}
              className="
              is-flex
              is-justify-content-space-between
              is-align-items-center
              "
            >
              <div className="is-flex is-align-items-center">
                <div className="control">
                  <input
                    ref={nameInputRef}
                    className="input"
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field has-text-right">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
