import * as React from "react";
import { useToggleState } from "@react-stately/toggle";
import { axe, fireEvent, press, render } from "reakit-test-utils";

import { AriaButton, Button, AriaToggleButton } from "..";

describe("AriaButton", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<AriaButton as="div">Click me</AriaButton>);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            role="button"
            tabindex="0"
            type="button"
          >
            Click me
          </div>
        </div>
      </body>
    `);
  });

  it("should properly fire onPress event", () => {
    const event = jest.fn();
    const { getByText: text } = render(
      <AriaButton onPress={event}>Click me</AriaButton>,
    );

    press.Tab();
    fireEvent.click(text("Click me"));

    expect(event).toHaveBeenCalledTimes(1);
  });

  it("should not fire onPress event on disabled", () => {
    const event = jest.fn();
    const { getByText: text } = render(
      <AriaButton onPress={event} disabled>
        Click me
      </AriaButton>,
    );

    press.Tab();
    fireEvent.click(text("Click me"));

    expect(event).toHaveBeenCalledTimes(0);
  });

  it("should auto focus", () => {
    const { getByText: text } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <AriaButton autoFocus>Click me</AriaButton>,
    );

    expect(text("Click me")).toHaveFocus();
  });

  it("Button renders with no a11y violations", async () => {
    const { container } = render(<AriaButton as="div">Click Me</AriaButton>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe("Button", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<Button as="div">Click me</Button>);

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            role="button"
            tabindex="0"
          >
            Click me
          </div>
        </div>
      </body>
    `);
  });

  it("Button renders with no a11y violations", async () => {
    const { container } = render(<Button as="div">Click Me</Button>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

export const ReactAriaToggleButton: React.FC = ({ children, ...props }) => {
  const state = useToggleState();
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <AriaToggleButton
      {...state}
      {...props}
      onPressChange={setIsPressed}
      style={{
        background: isPressed
          ? state.isSelected
            ? "darkblue"
            : "darkgreen"
          : state.isSelected
          ? "blue"
          : "green",
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        border: "none",
      }}
    >
      {children}
    </AriaToggleButton>
  );
};

describe("AriaToggleButton", () => {
  it("should render correctly", () => {
    const { baseElement } = render(
      <ReactAriaToggleButton>Click me</ReactAriaToggleButton>,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <button
            aria-pressed="false"
            style="background: green; color: white; padding: 10px; cursor: pointer; user-select: none;"
            type="button"
          >
            Click me
          </button>
        </div>
      </body>
    `);
  });

  it("Button renders with no a11y violations", async () => {
    const { container } = render(
      <ReactAriaToggleButton>Click Me</ReactAriaToggleButton>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
