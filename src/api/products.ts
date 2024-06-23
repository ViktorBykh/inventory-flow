import { Product } from "../types/Product";
import { client } from "../utils/fetchClient";

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>("/products");
};

export const getProductById = (productId: string) => {
  return client.get<Product[]>(`/products/${productId}`);
};

export const createProduct = ({
  name,
  category,
  price,
  quantity,
}: Omit<Product, "_id">) => {
  return client.post<Product>(`/products/`, {
    name,
    category,
    price,
    quantity,
  });
};

export const updateProduct = ({
  _id,
  name,
  category,
  price,
  quantity,
}: Product) => {
  return client.put<Product>(`/products/${_id}`, { name, category, price, quantity });
};

export const deleteProduct = (_id: string) => {
  return client.delete(`/products/${_id}`);
};
