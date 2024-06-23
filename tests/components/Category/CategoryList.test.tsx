import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryList } from "../../../src/components/Category/CategoryList";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "../../../src/api/categories";
import { BrowserRouter } from "react-router-dom";
window.React = React;

jest.mock("../../../src/api/categories", () => ({
  createCategory: jest.fn(),
  deleteCategory: jest.fn(),
  getCategories: jest.fn(),
  updateCategory: jest.fn(),
}));

let mockCategories = [
  { _id: "1", name: "Category 1" },
  { _id: "2", name: "Category 2" },
];

describe("CategoryList", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should render loading state while fetching categories", () => {
    (getCategories as jest.Mock).mockResolvedValueOnce(mockCategories);
    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>
    );

    expect(screen.getByText("Category List")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(5);
    expect(screen.getAllByTestId("skeleton-text")).toHaveLength(5);

    return waitFor(
      () => {
        expect(screen.getByText("Category 1")).toBeInTheDocument();
        expect(screen.getByText("Category 2")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should handle error while fetching categories", () => {
    (getCategories as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch categories")
    );

    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>
    );

    expect(screen.getByText("Category List")).toBeInTheDocument();

    return waitFor(
      () => {
        expect(
          screen.getByText("Error while fetching categories")
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should add a new category", () => {
    const categoryName = "New Category";
    const newCategory = { _id: "3", name: categoryName };

    (createCategory as jest.Mock).mockResolvedValueOnce(newCategory);
    (getCategories as jest.Mock).mockResolvedValueOnce(mockCategories);

    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>
    );

    return waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
    }, { timeout: 5000 }).then(() => {
      const inputElement = screen.getByPlaceholderText("Enter category name");
      fireEvent.change(inputElement, { target: { value: categoryName } });

      const addButton = screen.getByText("Add");
      fireEvent.click(addButton);

      expect(createCategory).toHaveBeenCalledWith({
        _id: "",
        name: categoryName,
      });

      return waitFor(() => {
        expect(screen.getByText(categoryName)).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  it("should update a category", () => {
    const updatedCategory = { _id: "1", name: "Updated Category" };
    (updateCategory as jest.Mock).mockResolvedValueOnce(updatedCategory);
    (getCategories as jest.Mock).mockResolvedValueOnce(mockCategories);

    render(
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>
    );

    return waitFor(
      () => {
        expect(screen.getByText("Category 1")).toBeInTheDocument();
      },
      { timeout: 5000 }
    ).then(() => {
      const editButton = screen.getAllByText("Edit")[0];
      fireEvent.click(editButton);

      const inputElement = screen.getByDisplayValue("Category 1");
      fireEvent.change(inputElement, {
        target: { value: "Updated Category" },
      });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);

      expect(updateCategory).toHaveBeenCalledWith(updatedCategory);

      return waitFor(
        () => {
          expect(screen.getByText("Updated Category")).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });
  });
});
