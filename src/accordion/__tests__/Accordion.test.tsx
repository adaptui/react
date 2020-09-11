import * as React from "react";
import { axe } from "jest-axe";
import { render, press } from "reakit-test-utils";

import {
  AccordionPanel,
  AccordionItem,
  AccordionTrigger,
  useAccordionState,
} from "..";

const AccordionComponent = (props: any) => {
  const state = useAccordionState(props);

  return (
    <div>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem id="accordion-2" {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem {...state}>
        <h3>
          <AccordionTrigger {...state}>Trigger 3</AccordionTrigger>
        </h3>
        <AccordionPanel {...state}>Panel 3</AccordionPanel>
      </AccordionItem>
    </div>
  );
};

test("Accordion should have proper keyboard navigation", () => {
  const { getByText: text } = render(<AccordionComponent />);

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

test("Accordion should have proper keyboard navigation (loop: false)", () => {
  const { getByText: text } = render(<AccordionComponent loop={false} />);

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

[true, false].forEach(toggle => {
  test(`Accordion allowToggle: ${toggle}`, () => {
    const { getByText: text } = render(
      <AccordionComponent allowToggle={toggle} />,
    );

    press.Tab();
    press.Enter();
    expect(text("Trigger 1")).toHaveFocus();
    expect(text("Panel 1")).toBeVisible();

    if (toggle) {
      // if allowToggle is true then pressing again will close it
      press.Enter();
      expect(text("Panel 1")).not.toBeVisible();
    } else {
      // if allowToggle is false then pressing again will close it
      press.Enter();
      expect(text("Panel 1")).toBeVisible();
    }
  });
});

test("Accordion should open/close properly with AllowMultiple: false", () => {
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

test("Accordion should open/close properly with AllowMultiple: true", () => {
  const { getByText: text } = render(
    <AccordionComponent allowMultiple={true} />,
  );

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

test("Accordion should have proper default active", () => {
  const { getByText: text } = render(
    <AccordionComponent defaultActiveId="accordion-2" />,
  );

  press.Tab();
  expect(text("Panel 1")).not.toBeVisible();
  expect(text("Panel 2")).toBeVisible();
});

test("Accordion manual: false", () => {
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
