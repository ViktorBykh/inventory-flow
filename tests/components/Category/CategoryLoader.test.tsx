import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryLoader } from "../../../src/components/Category/CategoryLoader";

describe("CategoryLoader", () => {
  it("should render 5 skeleton cards", () => {
    render(<CategoryLoader />);
    const skeletonCards = screen.getAllByTestId("skeleton-card");
    expect(skeletonCards).toHaveLength(5);
  });

  it("should render skeleton text and loading button in each card", () => {
    render(<CategoryLoader />);
    const skeletonTexts = screen.getAllByTestId("skeleton-text");
    const loadingButtons = screen.getAllByRole("button", { name: /Edit/i });
    expect(skeletonTexts).toHaveLength(5);
    expect(loadingButtons).toHaveLength(5);
  });
});
