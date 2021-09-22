import { renderHook } from "@testing-library/react-hooks";
import MockDate from "mockdate";

import { generateDaysInMonthArray, makeRange, useWeekDays } from "../helpers";

describe("Calendar Utils", () => {
  test("makeRange", () => {
    const range = makeRange(
      new Date(1999, 4, 4, 0, 0),
      new Date(2020, 4, 4, 0, 0),
    );
    expect(range.start).toMatchInlineSnapshot(`1999-05-03T18:30:00.000Z`);
    expect(range.end).toMatchInlineSnapshot(`2020-05-03T18:30:00.000Z`);
  });

  test("useWeekDays", () => {
    // MIND THE BLOCK SCOPE!
    {
      const {
        result: { current },
      } = renderHook(() => useWeekDays(0));

      expect(current).toMatchSnapshot();
    }
    {
      const {
        result: { current },
      } = renderHook(() => useWeekDays(2));

      expect(current).toMatchSnapshot();
    }
  });

  test("generateDaysInMonthArray", () => {
    MockDate.set(new Date("2020-02-01T11:30:00.000Z"));
    const days = generateDaysInMonthArray(1, 0, 7, 2020);

    expect(days).toMatchSnapshot();

    MockDate.reset();
  });
});
