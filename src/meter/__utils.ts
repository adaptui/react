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
export function clamp(value: number, min: number, max: number) {
  if (value == null) return 0;

  return Math.min(Math.max(value, min), max);
}

type CalculateStatusProps = {
  value: number;
  optimum: number;
  min: number;
  max: number;
  low: number;
  high: number;
};

export const calculateStatus = (props: CalculateStatusProps) => {
  const { value, optimum, min, max, low, high } = props;

  // This check always comes first
  if (isInRange(optimum, low, high)) {
    if (isInRange(value, low, high)) return "safe";
    return "caution";
  }

  if (isInRange(optimum, min, low)) {
    if (isInRange(value, min, low)) return "safe";
    if (value > low && value <= high) return "caution";
    return "danger";
  }

  if (isInRange(optimum, high, max)) {
    if (isInRange(value, high, max)) return "safe";
    if (value < high && value >= low) return "caution";
    return "danger";
  }

  // A safe return
  return "safe";
};

const isInRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;
