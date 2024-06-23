import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../src/api/categories";
import { Category } from "../../src/types/Category";
import fetchMock from "jest-fetch-mock";
import { BASE_URL } from "../../src/utils/fetchClient";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("getCategories fetches categories successfully", () => {
  const mockCategories: Category[] = [{ _id: "1", name: "Electronics" }];
  fetchMock.mockResponseOnce(JSON.stringify(mockCategories));

  return getCategories().then((categories) => {
    expect(categories).toEqual(mockCategories);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/categories`, {
      method: "GET",
    });
  });
});

test("getCategoryById fetches a single category by ID", () => {
  const mockCategory: Category = { _id: "1", name: "Electronics" };
  fetchMock.mockResponseOnce(JSON.stringify(mockCategory));

  return getCategoryById("1").then((category) => {
    expect(category).toEqual(mockCategory);
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/categories/1`,
      { method: "GET" }
    );
  });
});

test("createCategory creates a new category", () => {
  const newCategory = { name: "Books" };
  const mockResponse: Category = { _id: "2", name: "Books" };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

  return createCategory(newCategory).then((category) => {
    expect(category).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
  });
});

test("updateCategory updates an existing category", () => {
  const updatedCategory: Category = { _id: "1", name: "Books" };
  fetchMock.mockResponseOnce(JSON.stringify(updatedCategory));

  return updateCategory(updatedCategory).then(() => {
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/categories/1`,
      {
        method: "PUT",
        body: JSON.stringify({ name: "Books" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }
    );
  });
});

test("deleteCategory deletes a category", () => {
  fetchMock.mockResponseOnce(JSON.stringify({}));

  return deleteCategory("1").then(() => {
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/categories/1`,
      { method: "DELETE" }
    );
  });
});
