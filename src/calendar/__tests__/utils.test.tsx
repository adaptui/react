import MockDate from "mockdate";
import { renderHook } from "@testing-library/react-hooks";

import { generateDaysInMonthArray, makeRange, useWeekDays } from "../helpers";

describe("Calendar Utils", () => {
  test("makeRange", () => {
    const range = makeRange(
      new Date(1999, 4, 4, 0, 0),
      new Date(2020, 4, 4, 0, 0),
    );
    expect(range.start.toISOString()).toEqual("1999-05-03T18:30:00.000Z");
    expect(range.end.toISOString()).toEqual("2020-05-03T18:30:00.000Z");
  });

  test("useWeekDays", () => {
    // MIND THE BLOCK SCOPE!
    {
      const {
        result: { current },
      } = renderHook(() => useWeekDays(0));

      expect(current).toStrictEqual([
        { abbr: "Sun", title: "Sunday" },
        { abbr: "Mon", title: "Monday" },
        { abbr: "Tue", title: "Tuesday" },
        { abbr: "Wed", title: "Wednesday" },
        { abbr: "Thu", title: "Thursday" },
        { abbr: "Fri", title: "Friday" },
        { abbr: "Sat", title: "Saturday" },
      ]);
    }
    {
      const {
        result: { current },
      } = renderHook(() => useWeekDays(2));

      expect(current).toStrictEqual([
        { abbr: "Tue", title: "Tuesday" },
        { abbr: "Wed", title: "Wednesday" },
        { abbr: "Thu", title: "Thursday" },
        { abbr: "Fri", title: "Friday" },
        { abbr: "Sat", title: "Saturday" },
        { abbr: "Sun", title: "Sunday" },
        { abbr: "Mon", title: "Monday" },
      ]);
    }
  });

  test("generateDaysInMonthArray", () => {
    MockDate.set(new Date("2020-02-01T11:30:00.000Z"));
    const days = generateDaysInMonthArray(1, 0, 7, 2020);

    expect(days).toMatchInlineSnapshot(`
      Array [
        Array [
          2020-02-01T11:30:00.000Z,
          2020-02-02T11:30:00.000Z,
          2020-02-03T11:30:00.000Z,
          2020-02-04T11:30:00.000Z,
          2020-02-05T11:30:00.000Z,
          2020-02-06T11:30:00.000Z,
          2020-02-07T11:30:00.000Z,
        ],
        Array [
          2020-02-08T11:30:00.000Z,
          2020-02-09T11:30:00.000Z,
          2020-02-10T11:30:00.000Z,
          2020-02-11T11:30:00.000Z,
          2020-02-12T11:30:00.000Z,
          2020-02-13T11:30:00.000Z,
          2020-02-14T11:30:00.000Z,
        ],
        Array [
          2020-02-15T11:30:00.000Z,
          2020-02-16T11:30:00.000Z,
          2020-02-17T11:30:00.000Z,
          2020-02-18T11:30:00.000Z,
          2020-02-19T11:30:00.000Z,
          2020-02-20T11:30:00.000Z,
          2020-02-21T11:30:00.000Z,
        ],
        Array [
          2020-02-22T11:30:00.000Z,
          2020-02-23T11:30:00.000Z,
          2020-02-24T11:30:00.000Z,
          2020-02-25T11:30:00.000Z,
          2020-02-26T11:30:00.000Z,
          2020-02-27T11:30:00.000Z,
          2020-02-28T11:30:00.000Z,
        ],
        Array [
          2020-02-29T11:30:00.000Z,
          2020-03-01T11:30:00.000Z,
          2020-03-02T11:30:00.000Z,
          2020-03-03T11:30:00.000Z,
          2020-03-04T11:30:00.000Z,
          2020-03-05T11:30:00.000Z,
          2020-03-06T11:30:00.000Z,
        ],
        Array [
          2020-03-07T11:30:00.000Z,
          2020-03-08T11:30:00.000Z,
          2020-03-09T11:30:00.000Z,
          2020-03-10T11:30:00.000Z,
          2020-03-11T11:30:00.000Z,
          2020-03-12T11:30:00.000Z,
          2020-03-13T11:30:00.000Z,
        ],
        Array [
          2020-03-14T11:30:00.000Z,
          2020-03-15T11:30:00.000Z,
          2020-03-16T11:30:00.000Z,
          2020-03-17T11:30:00.000Z,
          2020-03-18T11:30:00.000Z,
          2020-03-19T11:30:00.000Z,
          2020-03-20T11:30:00.000Z,
        ],
      ]
    `);

    MockDate.reset();
  });
});
