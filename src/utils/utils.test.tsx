import MockDate from "mockdate";

import {
  parseDate,
  stringifyDate,
  parseRangeDate,
  isInvalidDateRange,
} from "./date";
import { clampValue, valueToPercent, getOptimumValue } from ".";

describe("Utils", () => {
  test("parseDate", () => {
    MockDate.set(
      new Date("Wed Oct 07 2020 18:00:00 GMT+0530 (India Standard Time)"),
    );

    expect(parseDate("2020-10-07")).toMatchInlineSnapshot(
      `2020-10-07T12:30:00.000Z`,
    );

    expect(parseDate("1-1-1")).toMatchInlineSnapshot(
      `0001-01-01T12:06:32.000Z`,
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
    expect(parseRangeDate({ start: "1999-5-15", end: "2020-8-12" })).toEqual({
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

  test("valueToPercent", () => {
    expect(valueToPercent(10, 0, 100)).toEqual(10);
    expect(valueToPercent(10, 0, 50)).toEqual(20);
    expect(valueToPercent(10, 0, 1)).toEqual(1000);
    expect(valueToPercent(10, 0, 1000)).toEqual(1);
    expect(valueToPercent(0.5, 0, 100)).toEqual(0.5);
  });

  test("getOptimumValue", () => {
    expect(getOptimumValue(0, 100)).toBe(50);
    expect(getOptimumValue(100, 0)).toBe(100);
    expect(getOptimumValue(100, 500)).toBe(300);
  });
});

// Error logs are not for PRO devs 😎
// we can debug without it
const oldLog = console.error;
beforeAll(() => {
  console.error = () => {};
});

afterAll(() => {
  console.error = oldLog;
});

// class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }
//   componentDidCatch(error: any, info: any) {
//     this.setState({ hasError: true });
//   }
//   render() {
//     if (this.state.hasError) return null;
//     return this.props.children;
//   }
// }
