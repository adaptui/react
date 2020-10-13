import { warn } from "@chakra-ui/utils";

/**
 * Clamps a value to ensure it stays within the min and max range.
 *
 * @param value the value to clamp
 * @param min the minimum value
 * @param max the maximum value
 *
 * @see https://github.com/chakra-ui/chakra-ui/blob/c38892760257b9bbf1b63c05f7f9ccf1684a90b0/packages/utils/src/number.ts
 */
export function clampValue(value: number, min: number, max: number) {
  if (value == null) return value;

  warn({
    condition: max < min,
    message: "clamp: max cannot be less than min",
  });

  return Math.min(Math.max(value, min), max);
}

export function isTouch() {
  return Boolean(
    "ontouchstart" in window ||
      window.navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0,
  );
}

export * from "./date";
