import * as React from "react";
import { render } from "reakit-test-utils";
import { renderHook } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";

import { MeterComp } from "../index";
import { useMeterState, UseMeterProps } from "../../index";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function renderMeterStateHook(props: UseMeterProps = {}) {
  return renderHook(() => useMeterState(props)).result;
}

describe("Meter", function () {
  test("default meter markup", function () {
    const { container } = render(<MeterComp />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
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
    const { getByTestId } = render(<MeterComp data-testid="test" />);
    const meter = getByTestId("test");

    expect(meter).toBeInTheDocument();
  });

  it("meter state initial state", function () {
    const result = renderMeterStateHook();

    expect(result.current).toMatchObject({
      high: 1,
      low: 0,
      max: 1,
      min: 0,
      optimum: 0.5,
      percent: 0,
      status: "safe",
      value: 0,
    });
  });

  it("meter state with value", function () {
    const result = renderMeterStateHook({ value: 0.5 });

    expect(result.current).toMatchObject({
      high: 1,
      low: 0,
      max: 1,
      min: 0,
      optimum: 0.5,
      percent: 50,
      status: "safe",
      value: 0.5,
    });
  });

  it("meter state with custom props", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 5,
      percent: 50,
      status: "safe",
      value: 5,
    });
  });

  it("meter state with optimum < min", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: -5,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 0,
      percent: 50,
      status: "caution",
      value: 5,
    });
  });

  it("meter state with optimum > max", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: 15,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 10,
      percent: 50,
      status: "caution",
      value: 5,
    });
  });

  it("meter state with optimum between low & high and value at same range", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: 5,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 5,
      percent: 50,
      status: "safe",
      value: 5,
    });
  });

  it("meter state with optimum between low & high and value below low", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 2,
      high: 7.5,
      max: 10,
      optimum: 5,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 5,
      percent: 20,
      status: "caution",
      value: 2,
    });
  });

  it("meter state with optimum between low & high and value above high", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 8,
      high: 7.5,
      max: 10,
      optimum: 5,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 5,
      percent: 80,
      status: "caution",
      value: 8,
    });
  });

  it("meter state with optimum at high", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: 7.5,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 7.5,
      percent: 50,
      status: "safe",
      value: 5,
    });
  });

  it("meter state with optimum at low", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: 2.5,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 2.5,
      percent: 50,
      status: "safe",
      value: 5,
    });
  });

  it("meter state with optimum < low & >= min and value at same range", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 0,
      high: 7.5,
      max: 10,
      optimum: 2,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 2,
      percent: 0,
      status: "safe",
      value: 0,
    });
  });

  it("meter state with optimum < low & >= min and value > low", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: 2,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 2,
      percent: 50,
      status: "caution",
      value: 5,
    });
  });

  it("meter state with optimum < low & >= min and value > high", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 8,
      high: 7.5,
      max: 10,
      optimum: 2,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 2,
      percent: 80,
      status: "danger",
      value: 8,
    });
  });

  it("meter state with optimum <= max & >= high & value at same range", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 8,
      high: 7.5,
      max: 10,
      optimum: 9,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 9,
      percent: 80,
      status: "safe",
      value: 8,
    });
  });

  it("meter state with optimum <= max & >= high & value < high", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 5,
      high: 7.5,
      max: 10,
      optimum: 9,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 9,
      percent: 50,
      status: "caution",
      value: 5,
    });
  });

  it("meter state with optimum <= max & >= high & value < low", function () {
    const result = renderMeterStateHook({
      min: 0,
      low: 2.5,
      value: 2,
      high: 7.5,
      max: 10,
      optimum: 9,
    });

    expect(result.current).toMatchObject({
      high: 7.5,
      low: 2.5,
      max: 10,
      min: 0,
      optimum: 9,
      percent: 20,
      status: "danger",
      value: 2,
    });
  });
});
