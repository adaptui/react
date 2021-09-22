import MockDate from "mockdate";

import { cycleValue, getSegmentLimits, setSegment } from "../helpers";

describe("Segment Utils", () => {
  test("getSegmentLimits", () => {
    MockDate.set(new Date("2020-02-01T11:30:00.000Z"));

    // @ts-ignore
    expect(getSegmentLimits(new Date(), "month", {})).toEqual({
      value: 2,
      minValue: 1,
      maxValue: 12,
    });

    // @ts-ignore
    expect(getSegmentLimits(new Date(), "year", {})).toEqual({
      value: 2020,
      minValue: 1,
      maxValue: 9999,
    });

    // @ts-ignore
    expect(getSegmentLimits(new Date(), "day", {})).toEqual({
      value: 1,
      minValue: 1,
      maxValue: 29,
    });

    // @ts-ignore
    expect(getSegmentLimits(new Date(), "dayPeriod", {})).toEqual({
      value: 12,
      minValue: 0,
      maxValue: 12,
    });

    // @ts-ignore
    expect(getSegmentLimits(new Date(), "minute", {})).toEqual({
      value: 0,
      minValue: 0,
      maxValue: 59,
    });

    // @ts-ignore
    expect(getSegmentLimits(new Date(), "second", {})).toEqual({
      value: 0,
      minValue: 0,
      maxValue: 59,
    });
  });

  test("setSegment", () => {
    MockDate.set(new Date("2020-02-01T11:30:00.000Z"));

    const options = new Intl.DateTimeFormat().resolvedOptions();
    expect(setSegment(new Date(), "month", 5, options)).toMatchInlineSnapshot(
      `2020-05-01T11:30:00.000Z`,
    );

    expect(setSegment(new Date(), "day", 5, options)).toMatchInlineSnapshot(
      `2020-02-05T11:30:00.000Z`,
    );

    expect(setSegment(new Date(), "hour", 10, options)).toMatchInlineSnapshot(
      `2020-02-01T04:30:00.000Z`,
    );

    expect(setSegment(new Date(), "year", 2050, options)).toMatchInlineSnapshot(
      `2050-02-01T11:30:00.000Z`,
    );
  });

  describe("cycleValue", () => {
    it("should cycle one step", () => {
      let value = 100;
      value = cycleValue(value, 1, 0, 500, false);

      expect(value).toBe(101);
    });

    it("should cycle back at when reached max value", () => {
      let value = 100;
      value = cycleValue(value, 1, 0, 100, false);

      expect(value).toBe(0);
    });

    it("should cycle from minimum value if it's our of range", () => {
      let value = 0;
      value = cycleValue(value, 1, 50, 100, false);

      expect(value).toBe(52);
    });

    it("should cycle with round", () => {
      let value = 0;
      value = cycleValue(value, 10, 0, 100, true);

      expect(value).toBe(10);
    });
  });
});
