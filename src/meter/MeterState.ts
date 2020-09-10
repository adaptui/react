import { valueToPercent } from "@chakra-ui/utils";

export interface UseMeterProps {
  /**
   * The `value` of the meter indicator.
   * If `undefined`/`not valid` the meter bar will be equal to `min`
   */
  value?: number;
  /**
   * The minimum value of the meter
   */
  min?: number;
  /**
   * The maximum value of the meter
   */
  max?: number;
  /**
   * The higher limit of min range
   */
  low?: number;
  /**
   * The lower limit of max range
   */
  high?: number;
  /**
   * The lower limit of max range
   */
  optimum?: number;
}

export const useMeterState = (props: UseMeterProps = {}) => {
  const { min = 0, max = 1 } = props;
  let {
    value = 0,
    low = min,
    high = max,
    optimum = getDefaultOptimumValue(low, high),
  } = props;
  let status: "safe" | "caution" | "danger" | undefined = undefined;

  value = handleInequalities(value, min, max);
  low = handleInequalities(low, min, max);
  high = handleInequalities(high, min, max);
  optimum = handleInequalities(optimum, min, max);

  if (low >= high) low = high;
  if (high <= low) high = low;

  if (optimum >= low && optimum <= high) {
    if (value >= low && value <= high) {
      status = "safe";
    } else {
      status = "caution";
    }
  }

  if (optimum >= high && optimum <= max) {
    if (value >= high && value <= max) {
      status = "safe";
    } else if (value < high && value >= low) {
      status = "caution";
    } else {
      status = "danger";
    }
  }

  if (optimum >= min && optimum <= low) {
    if (value >= min && value <= low) {
      status = "safe";
    } else if (value > low && value <= high) {
      status = "caution";
    } else {
      status = "danger";
    }
  }

  const percent = value != null ? valueToPercent(value, min, max) : undefined;

  return { value, low, high, optimum, min, max, status, percent };
};

export type MeterStateReturn = ReturnType<typeof useMeterState>;

/**
 * The browser <input type="range" /> calculates
 * the default value of a slider by using mid-point
 * between the min and the max.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 */
export function getDefaultOptimumValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2;
}

export function handleInequalities(value: number, min: number, max: number) {
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
}
