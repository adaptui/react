import { clamp, isInRange, getDefaultOptimumValue } from "../helpers";

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

  test("clamp", () => {
    expect(clamp(null, 1, 2)).toBe(0);
    expect(clamp(5, 0, 2)).toBe(2);
    expect(clamp(-5, 0, 2)).toBe(0);
    expect(clamp(2, 5, 8)).toBe(5);
    expect(clamp(6, 5, 8)).toBe(6);
    expect(clamp(6, -5, -2)).toBe(-2);
    expect(clamp(-8, -5, -10)).toBe(-10);
  });
});
