import React from "react";
import { fireEvent, render } from "reakit-test-utils";
import { renderHook } from "reakit-test-utils/hooks";
import { useSpinner } from "../__utils";

const noop = () => {};
function renderUseSpinner(increment = noop, decrement = noop) {
  return renderHook(() => useSpinner(increment, decrement)).result;
}

const Example = () => {
  const [value, setValue] = React.useState(0);
  const { up, down } = useSpinner(
    () => setValue(v => v + 1),
    () => setValue(v => v - 1),
  );

  return (
    <div>
      <p data-testid="value">{value}</p>
      <button onClick={() => up()}>+</button>
      <button onClick={() => down()}>-</button>
    </div>
  );
};

describe("useSpinner", () => {
  it("should render properly", () => {
    const inc = jest.fn();
    const dec = jest.fn();
    const { current } = renderUseSpinner(inc, dec);

    expect(current).toMatchInlineSnapshot(`
      Object {
        "down": [Function],
        "stop": [Function],
        "up": [Function],
      }
    `);
  });

  it("press up", async () => {
    const { getByTestId: testId, getByText: text } = render(<Example />);

    fireEvent.mouseDown(text("+"));
    expect(testId("value")).toBe("1");
  });

  it("press down", async () => {
    const { getByTestId: testId, getByText: text } = render(<Example />);

    fireEvent.mouseDown(text("-"));
    expect(testId("value")).toBe("-1");
  });

  // TODO: Simulate mouse hold to check for timeout and intervals of increments
});
