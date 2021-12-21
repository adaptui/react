import { act, renderHook } from "reakit-test-utils/hooks";

import { SegmentInitialState, useSegmentState } from "../SegmentState";

function render({ ...initialState }: SegmentInitialState = {}) {
  return renderHook(() => useSegmentState({ ...initialState })).result;
}

describe("SegmentState", () => {
  it("should have proper segments", () => {
    const { current } = render({
      defaultValue: new Date(2050, 0, 0),
    });

    expect(current.segments).toMatchSnapshot();
  });

  it.each(["increment", "decrement"])(
    "should be able to %s a segment",
    type => {
      const { current } = render();

      expect(current.segments[0].value).toBe(1);
      act(() => {
        current[type]("month");
      });
      expect(current.segments[0].value).toBe(type === "increment" ? 2 : 12);

      expect(current.segments[2].value).toBe(1);
      act(() => {
        current[type]("day");
      });

      expect(current.segments[2].value).toBe(type === "increment" ? 2 : 31);
    },
  );

  it.each(["incrementPage", "decrementPage"])(
    // eslint-disable-next-line jest/no-identical-title
    "should be able to %s a segment",
    type => {
      const { current } = render();

      expect(current.segments[0].value).toBe(1);
      act(() => {
        current[type]("month");
      });
      expect(current.segments[0].value).toBe(type === "incrementPage" ? 3 : 11);

      expect(current.segments[2].value).toBe(1);
      act(() => {
        current[type]("day");
      });
      expect(current.segments[2].value).toBe(type === "incrementPage" ? 8 : 24);
    },
  );

  it("should be able to setSegment", () => {
    const { current } = render();

    expect(current.segments[0].value).toBe(1);

    act(() => {
      current.setSegment("month", 8);
    });
    expect(current.segments[0].value).toBe(8);

    act(() => {
      current.setSegment("day", 15);
    });
    expect(current.segments[2].value).toBe(15);

    act(() => {
      current.setSegment("year", 2080);
    });
    expect(current.segments[4].value).toBe(2080);
  });

  it("should be able to setFieldValue", () => {
    const { current } = render({ defaultValue: new Date(2050, 0, 0) });

    expect(current.fieldValue).toStrictEqual(new Date(2050, 0, 0));

    act(() => {
      current.setFieldValue(new Date(2030, 5, 5));
    });
    expect(current.fieldValue).toStrictEqual(new Date(2030, 5, 5));
  });

  it("should support different formatOptions", () => {
    const { current } = render({
      defaultValue: new Date(2050, 0, 0),
      formatOptions: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      },
    });

    expect(current.segments).toMatchSnapshot();
  });
});
