import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../src/api/products";
import { Product } from "../../src/types/Product";
import fetchMock from "jest-fetch-mock";
import { BASE_URL } from "../../src/utils/fetchClient";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("getProducts fetches products successfully", () => {
  const mockProducts: Product[] = [
    {
      _id: "1",
      name: "Laptop",
      category: "Electronics",
      price: 1000,
      quantity: 10,
    },
  ];
  fetchMock.mockResponseOnce(JSON.stringify(mockProducts));

  return getProducts().then((products) => {
    expect(products).toEqual(mockProducts);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/products`, {
      method: "GET",
    });
  });
});

test("getProductById fetches a single product by ID", () => {
  const mockProduct: Product = {
    _id: "1",
    name: "Laptop",
    category: "Electronics",
    price: 1000,
    quantity: 10,
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockProduct));

  return getProductById("1").then((product) => {
    expect(product).toEqual(mockProduct);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/products/1`, {
      method: "GET",
    });
  });
});

test("createProduct creates a new product", () => {
  const newProduct = {
    name: "Smartphone",
    category: "Electronics",
    price: 500,
    quantity: 20,
  };
  const mockResponse: Product = { _id: "2", ...newProduct };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

  return createProduct(newProduct).then((createdProduct) => {
    expect(createdProduct).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newProduct),
    });
  });
});

test("updateProduct updates an existing product", () => {
  const updatedProduct: Product = {
    _id: "1",
    name: "Updated Laptop",
    category: "Electronics",
    price: 1200,
    quantity: 15,
  };
  fetchMock.mockResponseOnce(JSON.stringify(updatedProduct));

  return updateProduct(updatedProduct).then((productFormDb) => {
    expect(productFormDb).toEqual(updatedProduct);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/products/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name: "Updated Laptop",
        category: "Electronics",
        price: 1200,
        quantity: 15,
      }),
    });
  });
});

test("deleteProduct deletes a product by ID", () => {
  fetchMock.mockResponseOnce(JSON.stringify({}));

  return deleteProduct("1").then((result) => {
    expect(result).toEqual({});
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/products/1`, {
      method: "DELETE",
    });
  });
});
