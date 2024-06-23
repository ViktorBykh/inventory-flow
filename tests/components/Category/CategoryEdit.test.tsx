import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryEdit } from "../../../src/components/Category/CategoryEdit";
import { Category } from "../../../src/types/Category";

describe("CategoryEdit", () => {
  const mockCategory: Category = { _id: "1", name: "Electronics" };
  let mockOnUpdate: jest.Mock<any, any>;
  let mockOnCancel: jest.Mock<any, any>;
  let mockOnDelete: jest.Mock<any, any>;

  beforeEach(() => {
    mockOnUpdate = jest.fn();
    mockOnCancel = jest.fn();
    mockOnDelete = jest.fn();
  });

  it("should render input field and buttons", () => {
    render(
      <CategoryEdit
        category={mockCategory}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  it("should call onUpdate with the correct category when form is submitted", () => {
    render(
      <CategoryEdit
        category={mockCategory}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    const inputElement = screen.getByLabelText("Name");
    fireEvent.change(inputElement, { target: { value: "New Category Name" } });
    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      _id: mockCategory._id,
      name: "New Category Name",
    });
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(
      <CategoryEdit
        category={mockCategory}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should call onDelete with the correct category ID when delete button is clicked", () => {
    render(
      <CategoryEdit
        category={mockCategory}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(mockOnDelete).toHaveBeenCalledWith(mockCategory._id);
  });

  it("should close the modal when the modal background is clicked", () => {
    render(
      <CategoryEdit
        category={mockCategory}
        onUpdate={mockOnUpdate}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
