import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import { valueToPercent } from "../utils";
import { getDefaultOptimumValue, calculateStatus, clamp } from "./helpers";

export type TStatus = "safe" | "caution" | "danger" | undefined;

export type MeterInitialState = {
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
};

export const useMeterState = (
  initialState: SealedInitialState<MeterInitialState> = {},
) => {
  const {
    value: initialValue = 0,
    min = 0,
    max = 1,
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

  const status: TStatus = calculateStatus({
    value,
    min,
    max,
    low,
    optimum,
    high,
  });
  const percent = valueToPercent(value, min, max);

  return { value, min, max, low, optimum, high, status, percent };
};

export type MeterStateReturn = ReturnType<typeof useMeterState>;
