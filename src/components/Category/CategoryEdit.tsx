import React, { useState } from "react";
import { Category } from "../../types/Category";

type Props = {
  category: Category;
  onUpdate: (category: Category) => void;
  onCancel: () => void;
  onDelete: (categoryId: string) => void;
};

export const CategoryEdit: React.FC<Props> = ({
  category,
  onUpdate,
  onCancel,
  onDelete,
}) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryDescription, setCategoryDescription] = useState(category.description);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedCategory = {
      ...category,
      name: categoryName,
      description: categoryDescription,
    };
    onUpdate(updatedCategory);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onCancel}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Category</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="category-name">
                Name
              </label>
              <div className="control">
                <input
                  id="category-name"
                  className="input"
                  type="text"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="category-description">
                Description
              </label>
              <div className="control">
                <textarea
                  id="category-description"
                  className="textarea"
                  value={categoryDescription}
                  onChange={(event) =>
                    setCategoryDescription(event.target.value)
                  }
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
                  onClick={() => onDelete(category._id)}
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
