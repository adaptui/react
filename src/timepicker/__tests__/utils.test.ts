import MockDate from "mockdate";

import {
  getSelectedDateFromValue,
  getSelectedValueFromDate,
  parseTime,
} from "../helpers";

describe("TimePicker Utils", () => {
  test("parseTime", () => {
    expect(parseTime("12:40")?.toTimeString()).toBe(
      "12:40:00 GMT+0530 (India Standard Time)",
    );
    expect(parseTime("23:01")?.toTimeString()).toBe(
      "23:01:00 GMT+0530 (India Standard Time)",
    );
    expect(parseTime("1:1")?.toTimeString()).toBeUndefined();
  });

  test("getSelectedValueFromDate", () => {
    expect(getSelectedValueFromDate(new Date(2020, 4, 4, 5, 12), "hour")).toBe(
      5,
    );
    expect(
      getSelectedValueFromDate(new Date(2020, 4, 4, 5, 12), "minute"),
    ).toBe(12);

    expect(
      getSelectedValueFromDate(new Date(2020, 4, 4, 5, 12), "meridian"),
    ).toBe(0);
  });

  test("getSelectedDateFromValue", () => {
    MockDate.set(new Date("2020-05-03T19:42:00.000Z"));

    expect(
      getSelectedDateFromValue(
        1,
        new Date(2020, 4, 4, 5, 12),
        "hour",
      ).toISOString(),
    ).toBe("2020-05-03T19:42:00.000Z");

    MockDate.reset();
  });
});
