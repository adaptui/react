import * as React from "react";
import { axe, render, press, fireEvent } from "reakit-test-utils";

import {
  PickerBase,
  PickerBaseContent,
  PickerBaseTrigger,
  usePickerBaseState,
  PickerBaseInitialState,
} from "..";

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
  test("should render correctly", () => {
    const { getByText: text, baseElement } = render(
      <PickerBaseComp visible={true} />,
    );

    expect(baseElement).toMatchInlineSnapshot(`
      <body
        style="padding-right: 1024px; overflow: hidden;"
      >
        <div>
          <div
            aria-expanded="true"
            aria-haspopup="dialog"
            aria-label="picker base"
            aria-owns="dialog-1"
            id="picker-1"
            role="button"
          >
            <div
              aria-controls="picker-test"
              aria-expanded="true"
              aria-haspopup="dialog"
              role="button"
              tabindex="-1"
            >
              open
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          class="__reakit-focus-trap"
          style="position: fixed;"
          tabindex="0"
        />
        <div
          class="__reakit-portal"
        >
          <div
            aria-modal="true"
            data-dialog="true"
            data-testid="picker-content"
            id="dialog-1"
            role="dialog"
            tabindex="-1"
          >
            Content
          </div>
        </div>
        <div
          aria-hidden="true"
          class="__reakit-focus-trap"
          style="position: fixed;"
          tabindex="0"
        />
      </body>
    `);
  });

  it("should open/close properly", () => {
    const { getByText: text, getByTestId: testId } = render(<PickerBaseComp />);

    expect(testId("picker-content")).not.toBeVisible();
    fireEvent.click(text("open"));
    expect(testId("picker-content")).toBeVisible();

    press.Escape();
    expect(testId("picker-content")).not.toBeVisible();
  });

  test("PickerBase renders with no a11y violations", async () => {
    const { container } = render(<PickerBaseComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
