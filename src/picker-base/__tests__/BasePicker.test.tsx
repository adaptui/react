import * as React from "react";
import { axe, render, press, fireEvent, screen } from "reakit-test-utils";

import {
  PickerBase,
  PickerBaseContent,
  PickerBaseTrigger,
  usePickerBaseState,
  PickerBaseInitialState,
} from "../index";

const PickerBaseComp: React.FC<PickerBaseInitialState> = props => {
  const state = usePickerBaseState({
    ...props,
    pickerId: "picker-1",
    dialogId: "dialog-1",
    baseId: "picker-test",
  });

  return (
    <>
      <PickerBase aria-label="picker base" {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </PickerBase>
      <PickerBaseContent data-testid="picker-content" {...state}>
        Content
      </PickerBaseContent>
    </>
  );
};

describe("PickerBase", () => {
  it("should render correctly", () => {
    const { baseElement } = render(<PickerBaseComp visible={true} />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should open/close properly", () => {
    render(<PickerBaseComp />);

    const pickerContent = screen.getByTestId("picker-content");

    expect(pickerContent).not.toBeVisible();
    fireEvent.click(screen.getByText("open"));
    expect(pickerContent).toBeVisible();

    press.Escape();
    expect(pickerContent).not.toBeVisible();
  });

  test("PickerBase renders with no a11y violations", async () => {
    const { container } = render(<PickerBaseComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
