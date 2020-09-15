import * as React from "react";
import { axe, render, press, click, fireEvent } from "reakit-test-utils";

import {
  NumberInput,
  UseNumberInputProps,
  useNumberInputState,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
} from "..";

const NumberInputComp = (props: UseNumberInputProps) => {
  const state = useNumberInputState(props);

  return (
    <label htmlFor="numberinput">
      <NumberInputDecrementButton data-testid="dec" {...state}>
        -
      </NumberInputDecrementButton>
      <NumberInput id="numberinput" data-testid="numberinput" {...state} />
      <NumberInputIncrementButton data-testid="inc" {...state}>
        +
      </NumberInputIncrementButton>
    </label>
  );
};

describe("NumberInput", () => {
  it("should render correctly", () => {
    const { getByTestId: testId } = render(
      <NumberInputComp defaultValue={0} />,
    );

    expect(testId("numberinput")).not.toHaveFocus();
    press.Tab();
    expect(testId("numberinput")).toHaveFocus();
  });

  it("should increase/decrease with buttons", () => {
    const { getByTestId: testId } = render(
      <NumberInputComp defaultValue={0} />,
    );

    const incBtn = testId("inc");
    const decBtn = testId("dec");

    expect(testId("numberinput")).not.toHaveFocus();
    press.Tab();
    expect(testId("numberinput")).toHaveFocus();
    expect(testId("numberinput")).toHaveValue("0");
    click(incBtn);
    click(incBtn);
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("3");
    click(decBtn);
    click(decBtn);
    click(decBtn);
    expect(testId("numberinput")).toHaveValue("0");
  });

  it("should increase/decrease with scrollwheel", () => {
    const { getByTestId: testId } = render(
      <NumberInputComp defaultValue={0} />,
    );

    press.Tab();
    expect(testId("numberinput")).toHaveFocus();
    expect(testId("numberinput")).toHaveValue("0");

    fireEvent.wheel(testId("numberinput"), { deltaY: -100 });
    fireEvent.wheel(testId("numberinput"), { deltaY: -100 });
    expect(testId("numberinput")).toHaveValue("2");

    fireEvent.wheel(testId("numberinput"), { deltaY: 100 });
    fireEvent.wheel(testId("numberinput"), { deltaY: 100 });
    expect(testId("numberinput")).toHaveValue("0");
  });

  it("should behave properly with min/max/step options", () => {
    const { getByTestId: testId } = render(
      <NumberInputComp defaultValue={0} min={10} max={50} step={10} />,
    );

    const incBtn = testId("inc");
    const decBtn = testId("dec");

    press.Tab();
    expect(testId("numberinput")).toHaveFocus();
    // 3 times pressing wont matter since min value is 10
    click(decBtn);
    click(decBtn);
    click(decBtn);
    expect(testId("numberinput")).toHaveValue("10");

    click(incBtn);
    // step is 10
    expect(testId("numberinput")).toHaveValue("20");
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("30");
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("40");
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("50");
    // 3 times pressing wont matter since max value is 50
    click(incBtn);
    click(incBtn);
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("50");
  });

  it("should behave properly precision value", () => {
    const { getByTestId: testId } = render(
      <NumberInputComp defaultValue={0} step={0.65} precision={2} />,
    );

    const incBtn = testId("inc");
    const decBtn = testId("dec");

    press.Tab();
    expect(testId("numberinput")).toHaveFocus();
    expect(testId("numberinput")).toHaveValue("0.00");
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("0.65");
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("1.30");
    click(incBtn);
    expect(testId("numberinput")).toHaveValue("1.95");
    click(decBtn);
    expect(testId("numberinput")).toHaveValue("1.30");
  });

  it("should behave properly clampValueOnBlur/keepWithinRange", () => {
    // note clampValueOnBlur/keepWithinRange is true by default
    const { getByTestId: testId } = render(
      <NumberInputComp
        clampValueOnBlur={true}
        keepWithinRange={true}
        defaultValue={15}
        min={10}
        max={50}
      />,
    );

    press.Tab();
    expect(testId("numberinput")).toHaveFocus();
    expect(testId("numberinput")).toHaveValue("15");

    fireEvent.change(testId("numberinput"), { target: { value: "25" } });
    expect(testId("numberinput")).toHaveValue("25");

    fireEvent.change(testId("numberinput"), { target: { value: "999999" } });
    click(document.body); // blur
    expect(testId("numberinput")).not.toHaveFocus();
    expect(testId("numberinput")).toHaveValue("50");

    press.Tab(); // get back focus
    fireEvent.change(testId("numberinput"), { target: { value: "0" } });
    click(document.body); // blur
    expect(testId("numberinput")).not.toHaveFocus();
    expect(testId("numberinput")).toHaveValue("10");
  });

  test("NumberInput renders with no a11y violations", async () => {
    const { container } = render(<NumberInputComp />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
