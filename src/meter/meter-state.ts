import { useMemo } from "react";

import {
  calculateStatus,
  clamp,
  getOptimumValue,
  valueToPercent,
} from "./__utils";

/**
 * Provides state for the `Meter` components.
 * @example
 * ```jsx
 * const meter = useMeterState();
 * <Meter state={meter} />
 * ```
 */
export function useMeterState({
  value: defaultValue = 0,
  min = 0,
  max = 1,
  ...props
}: MeterStateProps = {}): MeterState {
  const initialLow = props.low ?? min;
  const initialHigh = props.high ?? max;
  const initialOptimum =
    props.optimum ?? getOptimumValue(initialLow, initialHigh);

  const value = clamp(defaultValue, min, max);
  const optimum = clamp(initialOptimum, min, max);
  let low = clamp(initialLow, min, max);
  let high = clamp(initialHigh, min, max);

  // More inequalities handled
  //  low ≤ high (if both low and high are specified)
  if (low >= high) low = high;
  if (high <= low) high = low;

  const status: Status = calculateStatus({
    value,
    min,
    max,
    low,
    optimum,
    high,
  });
  const percent = valueToPercent(value, min, max);

  const state = useMemo(
    () => ({ value, min, max, low, optimum, high, status, percent }),
    [value, min, max, low, optimum, high, status, percent],
  );

  return state;
}

type Status = "safe" | "caution" | "danger" | undefined;

export type MeterState = {
  /**
   * The `value` of the meter indicator.
   *
   * If `undefined`/`not valid` the meter bar will be equal to `min`
   *
   * @default 0
   */
  value: number;
  /**
   * The minimum value of the meter
   * @default 0
   */
  min: number;
  /**
   * The maximum value of the meter
   * @default 1
   */
  max: number;
  /**
   * The higher limit of min range.
   *
   * Defaults to `min`.
   * @default 0
   */
  low: number;
  /**
   * The lower limit of max range.
   *
   * Defaults to `max`.
   * @default 1
   */
  high: number;
  /**
   * The lower limit of max range.
   *
   * Defaults to `median of low & high`.
   * @default 0.5
   */
  optimum: number;
  /**
   * Percentage of the value progressed with respect to min & max
   */
  percent: number;
  /**
   * Status of the Meter based on the optimum value
   */
  status: Status;
};

export type MeterStateProps = Pick<
  Partial<MeterState>,
  "value" | "min" | "max" | "low" | "optimum" | "high"
>;
