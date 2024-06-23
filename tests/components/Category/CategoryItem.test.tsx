import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryItem } from "../../../src/components/Category/CategoryItem";
import { Category } from "../../../src/types/Category";

describe("CategoryItem", () => {
  const mockCategory: Category = { _id: "1", name: "Electronics" };
  const mockIndex: number = 0;
  let mockOnEdit: jest.Mock<any, any>;

  beforeEach(() => {
    mockOnEdit = jest.fn();
  });

  it("should render category name and edit button", () => {
    render(
      <CategoryItem
        category={mockCategory}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
  });

  it("should call onEdit function when edit button is clicked", () => {
    render(
      <CategoryItem
        category={mockCategory}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it("should display the correct image", () => {
    render(
      <CategoryItem
        category={mockCategory}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    const image = screen.getByAltText(mockCategory.name);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain(
      "https://www.svgrepo.com/show/423534/monitor-mobbile.svg"
    );
  });

  it("should display the correct background color", () => {
    render(
      <CategoryItem
        category={mockCategory}
        index={mockIndex}
        onEdit={mockOnEdit}
      />
    );

    const image = screen.getByAltText(mockCategory.name);
    expect(image).toHaveStyle("background-color: #FFCDD2");
  });
});
