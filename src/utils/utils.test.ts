import {
  parseDate,
  stringifyDate,
  parseRangeDate,
  isInvalidDateRange,
} from "./date";
import { clampValue, getOptimumValue } from "./index";
import MockDate from "mockdate";

describe("Utils", () => {
  test("parseDate", () => {
    MockDate.set(
      new Date("Wed Oct 07 2020 18:00:00 GMT+0530 (India Standard Time)"),
    );

    expect(parseDate("2020-10-07")?.toString()).toEqual(
      "Wed Oct 07 2020 18:00:00 GMT+0530 (India Standard Time)",
    );

    expect(parseDate("1-1-1")?.toString()).toEqual(
      "Mon Jan 01 0001 18:00:00 GMT+0553 (India Standard Time)",
    );

    expect(parseDate("Hello world")).toBeUndefined();
    expect(parseDate("202020-2020-20")).toBeUndefined();

    MockDate.reset();
  });

  test("stringifyDate", () => {
    expect(stringifyDate(new Date(1999, 4, 5))).toEqual("1999-05-05");
    expect(stringifyDate(new Date("10-15-2020"))).toEqual("2020-10-15");
    expect(stringifyDate(new Date("2020-5-15"))).toEqual("2020-05-15");
    expect(stringifyDate(new Date("2020/5/15"))).toEqual("2020-05-15");
  });

  test("parseRangeDate", () => {
    expect(
      parseRangeDate({ start: "1999-5-15", end: "2020-8-12" }),
    ).toStrictEqual({
      start: parseDate("1999-5-15"),
      end: parseDate("2020-8-12"),
    });

    expect(
      parseRangeDate({ start: "invalid", end: "2020-8-12" }),
    ).toBeUndefined();

    expect(parseRangeDate()).toBeUndefined();
  });

  test("isInvalidDateRange", () => {
    expect(
      isInvalidDateRange(
        new Date(2020, 4, 4),
        new Date(2020, 1, 1),
        new Date(2020, 5, 5),
      ),
    ).toEqual(false);

    expect(
      isInvalidDateRange(
        new Date(2020, 8, 4),
        new Date(2020, 1, 1),
        new Date(2020, 5, 5),
      ),
    ).toEqual(true);

    expect(
      isInvalidDateRange(
        new Date(2020, 4, 4),
        new Date(2020, 5, 5),
        new Date(2020, 1, 1),
      ),
    ).toEqual(true);

    expect(
      isInvalidDateRange(
        new Date(2020, 4, 4),
        new Date(2020, 3, 3),
        new Date(2020, 4, 4),
      ),
    ).toEqual(false);
  });

  test("clampValue", () => {
    expect(clampValue(5, 1, 8)).toEqual(5);
    expect(clampValue(5, 1, 3)).toEqual(3);
    expect(clampValue(5, 6, 8)).toEqual(6);
  });

  test("getOptimumValue", () => {
    expect(getOptimumValue(0, 100)).toBe(50);
    expect(getOptimumValue(100, 0)).toBe(100);
    expect(getOptimumValue(100, 500)).toBe(300);
  });
});
