import { renderHook } from "@testing-library/react-hooks";
import { generateDaysInMonthArray, makeRange, useWeekDays } from "../__utils";

describe("Calendar Utils", () => {
  test("makeRange", () => {
    const range = makeRange(new Date(1999, 4, 4), new Date(2020, 4, 4));
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
    const days = generateDaysInMonthArray(1, 0, 7, 2020);

    expect(days).toMatchInlineSnapshot(`
      Array [
        Array [
          2020-02-01T10:30:00.000Z,
          2020-02-02T10:30:00.000Z,
          2020-02-03T10:30:00.000Z,
          2020-02-04T10:30:00.000Z,
          2020-02-05T10:30:00.000Z,
          2020-02-06T10:30:00.000Z,
          2020-02-07T10:30:00.000Z,
        ],
        Array [
          2020-02-08T10:30:00.000Z,
          2020-02-09T10:30:00.000Z,
          2020-02-10T10:30:00.000Z,
          2020-02-11T10:30:00.000Z,
          2020-02-12T10:30:00.000Z,
          2020-02-13T10:30:00.000Z,
          2020-02-14T10:30:00.000Z,
        ],
        Array [
          2020-02-15T10:30:00.000Z,
          2020-02-16T10:30:00.000Z,
          2020-02-17T10:30:00.000Z,
          2020-02-18T10:30:00.000Z,
          2020-02-19T10:30:00.000Z,
          2020-02-20T10:30:00.000Z,
          2020-02-21T10:30:00.000Z,
        ],
        Array [
          2020-02-22T10:30:00.000Z,
          2020-02-23T10:30:00.000Z,
          2020-02-24T10:30:00.000Z,
          2020-02-25T10:30:00.000Z,
          2020-02-26T10:30:00.000Z,
          2020-02-27T10:30:00.000Z,
          2020-02-28T10:30:00.000Z,
        ],
        Array [
          2020-02-29T10:30:00.000Z,
          2020-03-01T10:30:00.000Z,
          2020-03-02T10:30:00.000Z,
          2020-03-03T10:30:00.000Z,
          2020-03-04T10:30:00.000Z,
          2020-03-05T10:30:00.000Z,
          2020-03-06T10:30:00.000Z,
        ],
        Array [
          2020-03-07T10:30:00.000Z,
          2020-03-08T10:30:00.000Z,
          2020-03-09T10:30:00.000Z,
          2020-03-10T10:30:00.000Z,
          2020-03-11T10:30:00.000Z,
          2020-03-12T10:30:00.000Z,
          2020-03-13T10:30:00.000Z,
        ],
        Array [
          2020-03-14T10:30:00.000Z,
          2020-03-15T10:30:00.000Z,
          2020-03-16T10:30:00.000Z,
          2020-03-17T10:30:00.000Z,
          2020-03-18T10:30:00.000Z,
          2020-03-19T10:30:00.000Z,
          2020-03-20T10:30:00.000Z,
        ],
      ]
    `);
  });
});
