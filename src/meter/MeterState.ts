import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import { isFunction, valueToPercent } from "../utils";
import { getDefaultOptimumValue, calculateStatus, clamp } from "./helpers";

type Status = "safe" | "caution" | "danger" | undefined;

type AriaValueText = string | ((value: number, percent: number) => string);

export type MeterState = {
  /**
   * The `value` of the meter indicator.
   * If `undefined`/`not valid` the meter bar will be equal to `min`
   * @default 0
   */
  value?: number;
  /**
   * The minimum value of the meter
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the meter
   * @default 1
   */
  max?: number;
  /**
   * The higher limit of min range.
   * Defaults to `min`.
   * @default 0
   */
  low?: number;
  /**
   * The lower limit of max range.
   * Defaults to `max`.
   * @default 1
   */
  high?: number;
  /**
   * The lower limit of max range.
   * Defaults to `median of low & high`.
   * @default 0.5
   */
  optimum?: number;
  /**
   * Defines the human readable text alternative of aria-valuenow for a range widget.
   */
  ariaValueText: AriaValueText;
  /**
   * Percentage of the value progressed with respect to min & max
   */
  percent: number;
  /**
   * Status of the Meter based on the optimum value
   */
  status: Status;
};

export type MeterInitialState = Partial<
  Pick<
    MeterState,
    "value" | "min" | "max" | "low" | "optimum" | "high" | "ariaValueText"
  >
>;

export type MeterStateReturn = MeterState;

export const useMeterState = (
  initialState: SealedInitialState<MeterInitialState> = {},
): MeterStateReturn => {
  const {
    value: initialValue = 0,
    min = 0,
    max = 1,
    ariaValueText,
    ...sealed
  } = useSealedState(initialState);
  const initialLow = sealed.low ?? min;
  const initialHigh = sealed.high ?? max;
  const initialOptimum =
    sealed.optimum ?? getDefaultOptimumValue(initialLow, initialHigh);

  const value = clamp(initialValue, min, max);
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

  return {
    value,
    min,
    max,
    low,
    optimum,
    high,
    status,
    percent,
    ariaValueText: isFunction(ariaValueText)
      ? ariaValueText?.(value, percent)
      : `${value}%`,
  };
};
