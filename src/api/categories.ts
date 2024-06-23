import { Category } from "../types/Category";
import { client } from "../utils/fetchClient";

export const getCategories = (): Promise<Category[]> => {
  return client.get<Category[]>("/categories");
};

export const getCategoryById = (categoryId: string) => {
  return client.get<Category>(`/categories/${categoryId}`);
};

export const createCategory = ({ name }: Omit<Category, "_id">) => {
  return client.post<Category>("/categories", { name });
};

export const updateCategory = ({ _id, name, description }: Category) => {
  return client.put<Category>(`/categories/${_id}`, { name, description });
};

export const deleteCategory = (categoryId: string) => {
  return client.delete(`/categories/${categoryId}`);
};
