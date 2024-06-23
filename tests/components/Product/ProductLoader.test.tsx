import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ProductLoader } from "../../../src/components/Product/ProductLoader";
window.React = React;

describe("ProductLoader", () => {
  it("should render 5 skeleton cards", () => {
    render(<ProductLoader />);
    const skeletonCards = screen.getAllByTestId("skeleton-card");
    expect(skeletonCards).toHaveLength(5);
  });

  it("should render skeleton text in each card", () => {
    render(<ProductLoader />);
    const skeletonTexts = screen.getAllByTestId("skeleton-text");
    expect(skeletonTexts).toHaveLength(15);
  });

  it("should render loading buttons in each card", () => {
    render(<ProductLoader />);
    const loadingButtons = screen.getAllByRole("button", { name: /Edit/i });
    expect(loadingButtons).toHaveLength(5);
    loadingButtons.forEach((button) => {
      expect(button).toHaveClass("is-loading");
    });
  });
});
