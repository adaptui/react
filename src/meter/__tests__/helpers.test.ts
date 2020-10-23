import { isInRange, getDefaultOptimumValue } from "../helpers";

describe("Meter Helpers", () => {
  test("getDefaultOptimumValue", () => {
    expect(getDefaultOptimumValue(0, 100)).toBe(50);
    expect(getDefaultOptimumValue(100, 0)).toBe(100);
    expect(getDefaultOptimumValue(100, 500)).toBe(300);
  });

  test("isInRange", () => {
    expect(isInRange(100, 0, 50)).toBe(false);
    expect(isInRange(50, 0, 50)).toBe(true);
    expect(isInRange(50, 0, 40)).toBe(false);
    expect(isInRange(50, 40, 0)).toBe(false);
    expect(isInRange(50, 100, 0)).toBe(false);
  });
});
