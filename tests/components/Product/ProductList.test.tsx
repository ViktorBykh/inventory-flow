import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ProductList } from "../../../src/components/Product/ProductList";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../src/api/products";
import { BrowserRouter } from "react-router-dom";
window.React = React;

jest.mock("../../../src/api/products", () => ({
  createProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getProducts: jest.fn(),
  updateProduct: jest.fn(),
}));

let mockProducts = [
  { _id: "1", name: "Product 1" },
  { _id: "2", name: "Product 2" },
];

describe("ProductList", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should render loading state while fetching products", () => {
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.getByText("Product List")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(5);
    expect(screen.getAllByTestId("skeleton-text")).toHaveLength(15);

    return waitFor(
      () => {
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should handle error while fetching products", () => {
    (getProducts as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch products")
    );

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.getByText("Product List")).toBeInTheDocument();

    return waitFor(
      () => {
        expect(
          screen.getByText("Error while fetching products")
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should add a new product", () => {
    const productName = "New Product";
    const newProduct = { _id: "3", name: productName };

    (createProduct as jest.Mock).mockResolvedValueOnce(newProduct);
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    return waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    }, { timeout: 5000 }).then(() => {
      const inputElement = screen.getByPlaceholderText("Enter name");
      fireEvent.change(inputElement, { target: { value: productName } });

      const addButton = screen.getByText("Add");
      fireEvent.click(addButton);

      return waitFor(() => {
        expect(screen.getByDisplayValue(productName)).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  it("should update an existing product", () => {
    const updatedProduct = { _id: "1", name: "Updated Product" };

    (updateProduct as jest.Mock).mockResolvedValueOnce(updatedProduct);
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    return waitFor(
      () => {
        expect(screen.getByText("Product 1")).toBeInTheDocument();
      },
      { timeout: 5000 }
    ).then(() => {
      const editButton = screen.getAllByText("Edit")[0];
      fireEvent.click(editButton);

      const inputElement = screen.getByDisplayValue("Product 1");

      fireEvent.change(inputElement, {
        target: { value: "Updated Product" },
      });

      return waitFor(
        () => {
          expect(
            screen.getByDisplayValue("Updated Product")
          ).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });
  });

  it("should delete an existing product", () => {
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    const deleteddProduct = { _id: "1", orderNumber: "Product 1" };
    (deleteProduct as jest.Mock).mockResolvedValueOnce(deleteddProduct);

    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    return waitFor(
      () => {
        expect(screen.getByText("Product 2")).toBeInTheDocument();
      },
      { timeout: 5000 }
    ).then(() => {
      const editButton = screen.getAllByText("Edit")[0];
      fireEvent.click(editButton);

      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);

      return waitFor(
        () => {
          expect(screen.getAllByTestId("product-name")).toHaveLength(1);
        },
        { timeout: 5000 }
      );
    });
  });
});
