import * as React from "react";
import userEvent from "@testing-library/user-event";
import { axe, render, press } from "reakit-test-utils";

import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
  AccordionInitialState,
  AccordionStateReturn,
  useAccordionMultiState,
  AccordionMultiInitialState,
  AccordionMultiStateReturn,
} from "../index";

const AccordionComponent = (
  state: AccordionStateReturn | AccordionMultiStateReturn,
) => {
  return (
    <Accordion {...state}>
      <h3>
        <AccordionTrigger {...state}>trigger 1</AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>panel 1</AccordionPanel>
      <h3>
        <AccordionTrigger id="accordion-2" {...state}>
          trigger 2
        </AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>panel 2</AccordionPanel>
      <h3>
        <AccordionTrigger {...state}>trigger 3</AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>panel 3</AccordionPanel>
      <h3>
        <AccordionTrigger disabled {...state}>
          disabled
        </AccordionTrigger>
      </h3>
      <AccordionPanel {...state}>disabled panel</AccordionPanel>
    </Accordion>
  );
};

const AccordionSingleComponent = (props: Partial<AccordionInitialState>) => {
  const state = useAccordionState(props);

  return <AccordionComponent {...state} />;
};

const AccordionMultipleComponent = (
  props: Partial<AccordionMultiInitialState>,
) => {
  const state = useAccordionMultiState(props);

  return <AccordionComponent {...state} />;
};

describe("Accordion", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <AccordionSingleComponent baseId="accordion" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("Accordion should have proper keyboard navigation", () => {
    const { getByText: text } = render(<AccordionSingleComponent />);

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    press.ArrowDown();
    expect(text("trigger 2")).toHaveFocus();
    press.ArrowDown();
    expect(text("trigger 3")).toHaveFocus();
    press.ArrowDown();
    expect(text("disabled")).not.toHaveFocus();
    press.ArrowDown();
    expect(text("disabled")).not.toHaveFocus();
    press.ArrowUp();
    expect(text("trigger 2")).toHaveFocus();
    press.ArrowUp();
    expect(text("trigger 1")).toHaveFocus();
  });

  it("Accordion should work proper with mouse", () => {
    const { getByText: text } = render(<AccordionSingleComponent />);

    expect(text("panel 1")).not.toBeVisible();

    userEvent.click(text("trigger 1"));
    expect(text("panel 1")).toBeVisible();

    userEvent.click(text("trigger 2"));
    expect(text("panel 2")).toBeVisible();

    userEvent.click(text("trigger 3"));
    expect(text("panel 3")).toBeVisible();
  });

  it("Accordion should have proper keyboard navigation when on loop", () => {
    const { getByText: text } = render(<AccordionSingleComponent loop />);

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    press.ArrowDown();
    expect(text("trigger 2")).toHaveFocus();
    press.ArrowDown();
    expect(text("trigger 3")).toHaveFocus();
    press.ArrowDown();
    expect(text("disabled")).not.toHaveFocus();
    press.ArrowDown();
    expect(text("trigger 2")).toHaveFocus();
    press.ArrowUp();
    expect(text("trigger 1")).toHaveFocus();
    press.ArrowUp();
    expect(text("disabled")).not.toHaveFocus();
    expect(text("trigger 3")).toHaveFocus();
  });

  it.each([true, false])("Accordion allowToggle: %s", toggle => {
    const { getByText: text } = render(
      <AccordionSingleComponent allowToggle={toggle} />,
    );

    const panel1 = text("panel 1");

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    expect(panel1).not.toBeVisible();

    if (toggle) {
      // if allowToggle is true then pressing again will close it
      press.Enter();
      expect(panel1).toBeVisible();
      press.Enter();
      expect(panel1).not.toBeVisible();
    } else {
      // if allowToggle is false then pressing again will close it
      press.Enter();
      expect(panel1).toBeVisible();
      press.Enter();
      expect(panel1).toBeVisible();
    }
  });

  it("Accordion should open/close properly", () => {
    const { getByText: text } = render(<AccordionSingleComponent />);
    const panel1 = text("panel 1");
    const panel2 = text("panel 2");

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    expect(panel1).not.toBeVisible();
    // should work with SPACE too
    press.Space();
    expect(panel1).toBeVisible();

    // go to next panel
    press.ArrowDown();
    expect(panel2).not.toBeVisible();
    press.Enter();
    expect(panel2).toBeVisible();

    // panel 1 should be closed now if allowMultiple: false
    expect(panel1).not.toBeVisible();
  });

  it("Accordion should open/close properly with AllowMultiple", () => {
    const { getByText: text } = render(<AccordionMultipleComponent />);
    const panel1 = text("panel 1");
    const panel2 = text("panel 2");

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    expect(panel1).not.toBeVisible();

    press.Enter();
    expect(panel1).toBeVisible();

    // go to next panel
    press.ArrowDown();
    press.Enter();
    expect(panel2).toBeVisible();

    // panel 1 should be visible since allowmultiple is true
    expect(panel1).toBeVisible();
  });

  it("Accordion should have none selected by default", () => {
    const { getByText: text } = render(<AccordionSingleComponent />);

    press.Tab();
    expect(text("panel 1")).not.toBeVisible();
    expect(text("panel 2")).not.toBeVisible();
    expect(text("panel 3")).not.toBeVisible();
  });

  it("Accordion with selectedId given to be selected properly", () => {
    const { getByText: text } = render(
      <AccordionSingleComponent defaultSelectedId="accordion-2" />,
    );

    press.Tab();
    expect(text("panel 1")).not.toBeVisible();
    expect(text("panel 2")).toBeVisible();
  });

  it("Accordion manual: false", () => {
    const { getByText: text } = render(
      <AccordionSingleComponent manual={false} />,
    );

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    expect(text("panel 1")).toBeVisible();

    // go to next panel
    press.ArrowDown();
    expect(text("trigger 2")).toHaveFocus();
    expect(text("panel 2")).toBeVisible();

    // go to next panel
    press.ArrowDown();
    expect(text("trigger 3")).toHaveFocus();
    expect(text("panel 3")).toBeVisible();
  });

  it("Accordion disabled item", () => {
    const { getByText: text } = render(<AccordionSingleComponent />);

    press.Tab();
    expect(text("trigger 1")).toHaveFocus();
    press.Enter();
    expect(text("panel 1")).toBeVisible();

    userEvent.click(text("disabled"));
    expect(text("disabled panel")).not.toBeVisible();
  });

  test("Accordion renders with no a11y violations", async () => {
    const { container } = render(<AccordionSingleComponent />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
