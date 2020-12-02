import * as React from "react";
import userEvent from "@testing-library/user-event";
import { axe, render, press, screen } from "reakit-test-utils";

import MultiSelectComponent from "../stories/SelectMultiple.component";

jest.useFakeTimers();

describe("MultiSelect", () => {
  it("should be able to open popover and select an element", () => {
    render(<MultiSelectComponent />);

    const popover = screen.getByLabelText(/Fruits$/i);
    const popoverButton = screen.getByRole("button", {
      name: /fruit/i,
    });

    expect(popoverButton).toHaveTextContent(/select a fruit/i);
    expect(popover).not.toBeVisible();

    userEvent.click(popoverButton);

    expect(popover).toBeVisible();

    const apple = screen.getByRole("option", {
      name: /^apple$/i,
    });
    userEvent.click(apple);
    expect(popoverButton).toHaveTextContent(/1 fruits selected/i);

    const banana = screen.getByRole("option", {
      name: /banana/i,
    });
    userEvent.click(banana);
    expect(popoverButton).toHaveTextContent(/2 fruits selected/i);

    const figs = screen.getByRole("option", {
      name: /figs/i,
    });
    userEvent.click(figs);
    expect(popoverButton).toHaveTextContent(/3 fruits selected/i);

    press.Escape(popover);
    expect(popover).not.toBeVisible();
  });

  test("Select renders with no a11y violations", async () => {
    jest.useRealTimers();
    const { container } = render(<MultiSelectComponent />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
