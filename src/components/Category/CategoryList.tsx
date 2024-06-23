import React, { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../api/categories";
import { Category } from "../../types/Category";
import { CategoryItem } from "./CategoryItem";
import { CategoryEdit } from "./CategoryEdit";
import { CategoryAdd } from "./CategoryAdd";
import { CategoryLoader } from "./CategoryLoader";
import { wait } from "../../utils/wait";
import { Helmet } from "react-helmet";
import { Navigation } from "../Navigation";

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const title = "Category List";

  wait(5000).then(() => setErrorMessage(""));

  useEffect(() => {
    setLoading(true);
    wait(1000).then(() =>
      getCategories()
        .then((response: any) => {
          return response.message === "No categories yet"
            ? setCategories([])
            : setCategories([...response]);
        })
        .catch(() => setErrorMessage("Error while fetching categories"))
        .finally(() => setLoading(false))
    );
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    createCategory(newCategory)
      .then((response) => {
        const newCategoryId = response._id;
        if (categories.length === 0) {
          setCategories([{ ...newCategory, _id: newCategoryId }]);
          return;
        }
        setCategories([...categories, { ...newCategory, _id: newCategoryId }]);
      })
      .catch(() => setErrorMessage("Error while adding category"))
      .finally(() => setEditingCategory(null));
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    updateCategory(updatedCategory)
      .then(() =>
        setCategories(
          categories.map((category) =>
            category._id === updatedCategory._id ? updatedCategory : category
          )
        )
      )
      .catch(() => setErrorMessage("Error while updating category"))
      .finally(() => setEditingCategory(null));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category._id !== categoryId));
    deleteCategory(categoryId)
      .catch(() => setErrorMessage("Error while deleting category"))
      .finally(() => setEditingCategory(null));
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <Navigation title={title} />

          {errorMessage && (
            <div className="title has-text-danger">{errorMessage}</div>
          )}

          {loading && <CategoryLoader />}

          <div className="columns is-multiline">
            {!loading && !errorMessage && (
              <CategoryAdd onAdd={handleAddCategory} />
            )}

            {!loading &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <CategoryItem
                  key={`${category._id}-${index}`}
                  category={category}
                  index={index}
                  onEdit={() => setEditingCategory(category)}
                />
              ))}
          </div>

          {editingCategory && (
            <CategoryEdit
              category={editingCategory}
              onUpdate={handleUpdateCategory}
              onCancel={() => setEditingCategory(null)}
              onDelete={handleDeleteCategory}
            />
          )}
        </div>
      </section>
    </>
  );
};
