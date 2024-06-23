import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { OrderLoader } from "../../../src/components/Order/OrderLoader";
window.React = React;

describe("OrderLoader", () => {
  it("should render 5 skeleton cards", () => {
    render(<OrderLoader />);
    const skeletonCards = screen.getAllByTestId("skeleton-card");
    expect(skeletonCards).toHaveLength(5);
  });

  it("should render skeleton text in each card", () => {
    render(<OrderLoader />);
    const skeletonTexts = screen.getAllByTestId("skeleton-text");
    expect(skeletonTexts).toHaveLength(15);
  });

  it("should render loading buttons in each card", () => {
    render(<OrderLoader />);
    const loadingButtons = screen.getAllByRole("button", { name: /Edit/i });
    expect(loadingButtons).toHaveLength(5);
  });
});
