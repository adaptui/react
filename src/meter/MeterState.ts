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

  // More inequalities handled
  //  low ≤ high (if both low and high are specified)
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
 * The candidate optimum point is the midpoint between the minimum value and
 * the maximum value.
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element:attr-meter-high-8:~:text=boundary.-,The%20optimum%20point
 */
export function getDefaultOptimumValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2;
}

/**
 * Handle Inequalities with received values
 *
 * minimum ≤ value ≤ maximum
 * minimum ≤ low ≤ maximum (if low is specified)
 * minimum ≤ high ≤ maximum (if high is specified)
 * minimum ≤ optimum ≤ maximum (if optimum is specified)
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element:attr-meter-max-3:~:text=following%20inequalities%20must%20hold
 */
export function handleInequalities(value: number, min: number, max: number) {
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
}
