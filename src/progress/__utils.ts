export function clamp(value: number | null, min: number, max: number) {
  if (value == null) return null;

  return Math.min(Math.max(value, min), max);
}

/**
 * Convert a value to percentage based on lower and upper bound values
 *
 * @param value the value in number
 * @param min the minimum value
 * @param max the maximum value
 */
export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}
