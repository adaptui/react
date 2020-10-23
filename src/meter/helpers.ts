/**
 * The candidate optimum point is the midpoint between the minimum value and
 * the maximum value.
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element:attr-meter-high-8:~:text=boundary.-,The%20optimum%20point
 */
export function getDefaultOptimumValue(min: number, max: number) {
  return max < min ? min : min + (max - min) / 2;
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

export const isInRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;
