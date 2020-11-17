import * as React from "react";
import userEvent from "@testing-library/user-event";
import { axe, render, press, screen } from "reakit-test-utils";
import {
  Select,
  SelectOption,
  SelectPopover,
  useSelectState,
  SelectInitialState,
} from "..";

jest.useFakeTimers();

export const SelectComponent: React.FC<SelectInitialState> = props => {
  const select = useSelectState({ baseId: "select", ...props });

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
      <SelectPopover data-testid="popover" {...select} aria-label="Fruits">
        <SelectOption {...select} value="Apple" />
        <SelectOption {...select} value="AppleCusturd" />
        <SelectOption {...select} value="Orange" />
        <SelectOption {...select} value="Banana" />
      </SelectPopover>
    </>
  );
};

describe("Select", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<SelectComponent />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should be able to open popover and select an element", () => {
    render(<SelectComponent />);

    const popover = screen.getByTestId("popover");
    const popoverButton = screen.getByRole("button", {
      name: /fruit/i,
    });

    expect(popoverButton).toHaveTextContent(/select a fruit/i);
    expect(popover).not.toBeVisible();

    press.Tab();
    expect(popoverButton).toHaveFocus();
    userEvent.click(popoverButton);

    expect(popover).toBeVisible();

    const appleCusturd = screen.getByRole("option", {
      name: /applecusturd/i,
    });
    userEvent.click(appleCusturd);
    expect(popoverButton).toHaveTextContent(/applecusturd/i);
  });

  it("should be able to open popover and select an element with keyboard", () => {
    render(<SelectComponent />);

    const popover = screen.getByTestId("popover");
    const popoverButton = screen.getByRole("button", {
      name: /fruit/i,
    });

    expect(popoverButton).toHaveTextContent(/select a fruit/i);
    expect(popover).not.toBeVisible();

    press.Tab();
    expect(popoverButton).toHaveFocus();

    press.ArrowDown();
    // had micro-task queue operations because
    // Select ArrowDown uses setTimeout to open the popover in order to prevent scroll jump
    // see `onKeyDown` function of `Select.ts`
    jest.runAllTimers();

    expect(popover).toBeVisible();
    expect(screen.getByText("Apple")).toHaveFocus();

    // select orange
    press.ArrowDown();
    press.ArrowDown();
    const orange = screen.getByRole("option", {
      name: /orange/i,
    });
    expect(orange).toHaveFocus();

    press.Enter(orange);

    expect(popoverButton).toHaveTextContent(/orange/i);
    expect(popover).not.toBeVisible();
  });

  it("should behave properly with default selected", () => {
    render(<SelectComponent selectedValue={"orange"} />);

    const popover = screen.getByTestId("popover");
    const popoverButton = screen.getByRole("button", {
      name: /fruit/i,
    });

    expect(popoverButton).toHaveTextContent(/orange/i);
    expect(popover).not.toBeVisible();

    press.Tab();
    press.ArrowDown();
    jest.runAllTimers();
    expect(popover).toBeVisible();

    press.Tab();
    press.Enter();
    expect(popover).not.toBeVisible();
    expect(popoverButton).toHaveTextContent(/orange/i);
  });

  test("Select renders with no a11y violations", async () => {
    jest.useRealTimers();
    const { container } = render(<SelectComponent />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
