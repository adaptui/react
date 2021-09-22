import * as React from "react";
import { render } from "reakit-test-utils";
import { renderHook } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";
import cases from "jest-in-case";

import { MeterInitialState, useMeterState } from "../../index";
import { Meter } from "../Meter";

import { data } from "./statehook-test-data";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function renderMeterStateHook(props: MeterInitialState = {}) {
  return renderHook(() => useMeterState(props)).result;
}

const MeterComp: React.FC<MeterInitialState> = props => {
  const { value, low, high, optimum, min, max, ...rest } = props;
  const meter = useMeterState({
    value,
    low,
    high,
    optimum,
    min,
    max,
  });

  return <Meter aria-label="meter" {...meter} {...rest} />;
};

describe("Meter", () => {
  test("default meter markup", () => {
    const { container } = render(<MeterComp />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          aria-label="meter"
          aria-valuemax="1"
          aria-valuemin="0"
          aria-valuenow="0"
          aria-valuetext="0%"
          role="meter progressbar"
        />
      </div>
    `);
  });

  it("checks role", function () {
    const { getByRole } = render(<MeterComp />);
    const meter = getByRole("meter");
    const alsoProgressBar = getByRole("progressbar", { queryFallbacks: true });
    expect(meter).toBe(alsoProgressBar);
  });

  it("no value", function () {
    const { getByRole } = render(<MeterComp />);
    const meter = getByRole("meter");

    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "1");
    expect(meter).toHaveAttribute("aria-valuenow", "0");
    expect(meter).toHaveAttribute("aria-valuetext", "0%");
  });

  it("value between min and max", function () {
    const { getByRole } = render(<MeterComp value={0.5} />);
    const meter = getByRole("meter");

    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "1");
    expect(meter).toHaveAttribute("aria-valuenow", "0.5");
    expect(meter).toHaveAttribute("aria-valuetext", "50%");
  });

  it("value below min", function () {
    const { getByRole } = render(<MeterComp value={-0.5} />);
    const meter = getByRole("meter");

    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "1");
    expect(meter).toHaveAttribute("aria-valuenow", "0");
    expect(meter).toHaveAttribute("aria-valuetext", "0%");
  });

  it("value above max", function () {
    const { getByRole } = render(<MeterComp value={1.5} />);
    const meter = getByRole("meter");

    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "1");
    expect(meter).toHaveAttribute("aria-valuenow", "1");
    expect(meter).toHaveAttribute("aria-valuetext", "100%");
  });

  it("custom min and max", function () {
    const { getByRole } = render(<MeterComp min={0} value={5} max={10} />);
    const meter = getByRole("meter");

    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "10");
    expect(meter).toHaveAttribute("aria-valuenow", "5");
    expect(meter).toHaveAttribute("aria-valuetext", "50%");
  });

  it("supports aria-label", function () {
    const { getByRole } = render(<MeterComp aria-label="Meter" />);
    const meter = getByRole("meter");

    expect(meter).toHaveAttribute("aria-label", "Meter");
  });

  it("supports custom DOM props", function () {
    const { getByTestId } = render(<MeterComp data-testid="testid-test" />);
    const meter = getByTestId("testid-test");

    expect(meter).toBeInTheDocument();
  });

  cases(
    "meter state hook tests",
    (opts: any) => {
      const result = renderMeterStateHook(opts.in);
      expect(result.current).toMatchObject(opts.out);
    },
    data,
  );

  test("useMeterState: low >= high", function () {
    const { current } = renderMeterStateHook({ low: 1, high: 0.2 });

    expect(current.low).toBe(0.2);
    expect(current.high).toBe(0.2);
  });

  test("useMeterState: high >= low", function () {
    const { current } = renderMeterStateHook({ high: 1, low: 0.2 });

    expect(current.low).toBe(0.2);
    expect(current.high).toBe(1);
  });
});
