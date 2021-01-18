import {
  parseTime,
  getSelectedDateFromValue,
  getSelectedValueFromDate,
} from "../helpers";
import MockDate from "mockdate";

describe("TimePicker Utils", () => {
  test("parseTime", () => {
    expect(parseTime("12:40")?.toLocaleTimeString()).toBe("12:40:00");
    expect(parseTime("23:01")?.toLocaleTimeString()).toBe("23:01:00");
    expect(parseTime("1:1")?.toLocaleTimeString()).toBeUndefined();
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
