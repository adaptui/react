import React from "react";
import { fireEvent, render } from "reakit-test-utils";
import { SpinButtonProps, useSpinButton } from "@react-aria/spinbutton";

const SpinButtonComp: React.FC<SpinButtonProps> = props => {
  const { spinButtonProps } = useSpinButton(props);
  return (
    <div {...spinButtonProps} tabIndex={-1} data-testid="testid-test">
      {props.children}
    </div>
  );
};

describe("useSpinButton", () => {
  it('should have role="spinbutton" and aria props', () => {
    const { getByTestId: testId } = render(
      <SpinButtonComp
        value={2}
        textValue="2 items"
        minValue={1}
        maxValue={3}
      />,
    );

    const el = testId("testid-test");
    expect(el).toHaveAttribute("role", "spinbutton");
    expect(el).toHaveAttribute("aria-valuenow", "2");
    expect(el).toHaveAttribute("aria-valuemin", "1");
    expect(el).toHaveAttribute("aria-valuemax", "3");
    expect(el).toHaveAttribute("aria-valuetext", "2 items");
    expect(el).not.toHaveAttribute("aria-disabled");
    expect(el).not.toHaveAttribute("aria-readonly");
  });

  it("should have aria-disabled if isDisabled is set", () => {
    const { getByTestId: testId } = render(
      <SpinButtonComp
        value={2}
        textValue="2 items"
        minValue={1}
        maxValue={3}
        isDisabled
      />,
    );

    expect(testId("testid-test")).toHaveAttribute("aria-disabled", "true");
  });

  it("should have aria-readonly if isReadOnly is set", () => {
    const { getByTestId: testId } = render(
      <SpinButtonComp
        value={2}
        textValue="2 items"
        minValue={1}
        maxValue={3}
        isReadOnly
      />,
    );

    expect(testId("testid-test")).toHaveAttribute("aria-readonly", "true");
  });

  it("should trigger onIncrement on arrow up", () => {
    const onIncrement = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp value={2} onIncrement={onIncrement} />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "ArrowUp" });
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it("should trigger onDecrement on arrow down", () => {
    const onDecrement = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp value={2} onDecrement={onDecrement} />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "ArrowDown" });
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it("should trigger onIncrementPage on page up", () => {
    const onIncrementPage = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp value={2} onIncrementPage={onIncrementPage} />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "PageUp" });
    expect(onIncrementPage).toHaveBeenCalledTimes(1);
  });

  it("should fall back to onIncrement on page up if onIncrementPage is not available", () => {
    const onIncrement = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp value={2} onIncrement={onIncrement} />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "PageUp" });
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it("should trigger onDecrementPage on page up", () => {
    const onDecrementPage = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp value={2} onDecrementPage={onDecrementPage} />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "PageDown" });
    expect(onDecrementPage).toHaveBeenCalledTimes(1);
  });

  it("should fall back to onDecrement on page up if onDecrementPage is not available", () => {
    const onDecrement = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp value={2} onDecrement={onDecrement} />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "PageDown" });
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it("should trigger onDecrementToMin on home key", () => {
    const onDecrementToMin = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp
        value={2}
        onDecrementToMin={onDecrementToMin}
        minValue={1}
      />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "Home" });
    expect(onDecrementToMin).toHaveBeenCalledTimes(1);
  });

  it("should trigger onIncrementToMax on end key", () => {
    const onIncrementToMax = jest.fn();
    const { getByTestId: testId } = render(
      <SpinButtonComp
        value={2}
        onIncrementToMax={onIncrementToMax}
        maxValue={1}
      />,
    );

    fireEvent.keyDown(testId("testid-test"), { key: "End" });
    expect(onIncrementToMax).toHaveBeenCalledTimes(1);
  });
});
