import * as React from "react";
import { axe, render, press } from "reakit-test-utils";

import {
  AccordionPanel,
  Accordion,
  AccordionTrigger,
  useAccordionState,
  AccordionInitialState,
} from "../index";

const AccordionComponent = (props: Partial<AccordionInitialState>) => {
  const state = useAccordionState(props);

  return (
    <Accordion {...state}>
      <h3>
        <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>Panel 1</AccordionPanel>
      <h3>
        <AccordionTrigger id="accordion-2" {...state}>
          Trigger 2
        </AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>Panel 2</AccordionPanel>
      <h3>
        <AccordionTrigger {...state}>Trigger 3</AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>Panel 3</AccordionPanel>
    </Accordion>
  );
};

describe("Accordion", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<AccordionComponent baseId="accordion" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("Accordion should have proper keyboard navigation", () => {
    const { getByText: text } = render(<AccordionComponent />);

    press.Tab();
    expect(text("Trigger 1")).toHaveFocus();
    press.ArrowDown();
    expect(text("Trigger 2")).toHaveFocus();
    press.ArrowDown();
    expect(text("Trigger 3")).toHaveFocus();
    press.ArrowDown();
    expect(text("Trigger 3")).toHaveFocus();
    press.ArrowUp();
    expect(text("Trigger 2")).toHaveFocus();
    press.ArrowUp();
    expect(text("Trigger 1")).toHaveFocus();
  });

  it("Accordion should have proper keyboard navigation when on loop", () => {
    const { getByText: text } = render(<AccordionComponent loop />);

    press.Tab();
    expect(text("Trigger 1")).toHaveFocus();
    press.ArrowDown();
    expect(text("Trigger 2")).toHaveFocus();
    press.ArrowDown();
    expect(text("Trigger 3")).toHaveFocus();
    press.ArrowDown();
    expect(text("Trigger 1")).toHaveFocus();
    press.ArrowUp();
    expect(text("Trigger 3")).toHaveFocus();
    press.ArrowUp();
    expect(text("Trigger 2")).toHaveFocus();
  });

  it.each([true, false])("Accordion allowToggle: %s", toggle => {
    const { getByText: text } = render(
      <AccordionComponent allowToggle={toggle} />,
    );

    press.Tab();
    expect(text("Trigger 1")).toHaveFocus();
    expect(text("Panel 1")).not.toBeVisible();

    if (toggle) {
      // if allowToggle is true then pressing again will close it
      press.Enter();
      expect(text("Panel 1")).toBeVisible();
      press.Enter();
      expect(text("Panel 1")).not.toBeVisible();
    } else {
      // if allowToggle is false then pressing again will close it
      press.Enter();
      expect(text("Panel 1")).toBeVisible();
      press.Enter();
      expect(text("Panel 1")).toBeVisible();
    }
  });

  it("Accordion should open/close properly", () => {
    const { getByText: text } = render(<AccordionComponent />);

    press.Tab();
    expect(text("Trigger 1")).toHaveFocus();
    expect(text("Panel 1")).not.toBeVisible();
    press.Enter();
    expect(text("Panel 1")).toBeVisible();

    // go to next panel
    press.ArrowDown();
    expect(text("Panel 2")).not.toBeVisible();
    press.Enter();
    expect(text("Panel 2")).toBeVisible();

    // panel 1 should be closed now if allowMultiple: false
    expect(text("Panel 1")).not.toBeVisible();
  });

  it("Accordion should open/close properly with AllowMultiple", () => {
    const { getByText: text } = render(<AccordionComponent allowMultiple />);

    press.Tab();
    expect(text("Trigger 1")).toHaveFocus();
    expect(text("Panel 1")).not.toBeVisible();

    press.Enter();
    expect(text("Panel 1")).toBeVisible();

    // go to next panel
    press.ArrowDown();
    press.Enter();
    expect(text("Panel 2")).toBeVisible();

    // panel 1 should be visible since allowmultiple is true
    expect(text("Panel 1")).toBeVisible();
  });

  it("Accordion should have none selected by default", () => {
    const { getByText: text } = render(<AccordionComponent />);

    press.Tab();
    expect(text("Panel 1")).not.toBeVisible();
    expect(text("Panel 2")).not.toBeVisible();
    expect(text("Panel 3")).not.toBeVisible();
  });

  it("Accordion with selectedId given to be selected properly", () => {
    const { getByText: text } = render(
      <AccordionComponent defaultSelectedId="accordion-2" />,
    );

    press.Tab();
    expect(text("Panel 1")).not.toBeVisible();
    expect(text("Panel 2")).toBeVisible();
  });

  it("Accordion manual: false", () => {
    const { getByText: text } = render(<AccordionComponent manual={false} />);

    press.Tab();
    expect(text("Trigger 1")).toHaveFocus();
    expect(text("Panel 1")).toBeVisible();

    // go to next panel
    press.ArrowDown();
    expect(text("Trigger 2")).toHaveFocus();
    expect(text("Panel 2")).toBeVisible();

    // go to next panel
    press.ArrowDown();
    expect(text("Trigger 3")).toHaveFocus();
    expect(text("Panel 3")).toBeVisible();
  });

  test("Accordion renders with no a11y violations", async () => {
    const { container } = render(<AccordionComponent />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
