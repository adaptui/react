import { renderHook, act } from "reakit-test-utils/hooks";

import { usePaginationState } from "..";

describe("usePaginationState", () => {
  it("should render correctly", () => {
    const {
      result: { current },
    } = renderHook(() => usePaginationState({ count: 5 }));

    expect(current).toMatchInlineSnapshot(`
      Object {
        "currentPage": 1,
        "first": [Function],
        "isAtMax": false,
        "isAtMin": true,
        "last": [Function],
        "move": [Function],
        "next": [Function],
        "pages": Array [
          1,
          2,
          3,
          4,
          5,
        ],
        "prev": [Function],
      }
    `);
  });

  it("should rover to next/prev/last/first/move", async () => {
    const { result } = renderHook(() => usePaginationState({ count: 5 }));

    expect(result.current.isAtMin).toBe(true);
    expect(result.current.isAtMax).toBe(false);
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.next();
    });

    expect(result.current.isAtMin).toBe(false);
    expect(result.current.isAtMax).toBe(false);
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(3);

    // last
    act(() => {
      result.current.last();
    });

    expect(result.current.isAtMin).toBe(false);
    expect(result.current.isAtMax).toBe(true);
    expect(result.current.currentPage).toBe(5);

    // first
    act(() => {
      result.current.first();
    });

    expect(result.current.isAtMin).toBe(true);
    expect(result.current.isAtMax).toBe(false);
    expect(result.current.currentPage).toBe(1);

    // move
    act(() => {
      result.current.move(3);
    });

    expect(result.current.isAtMin).toBe(false);
    expect(result.current.isAtMax).toBe(false);
    expect(result.current.currentPage).toBe(3);
  });

  it("has a disabled previous button & an enabled next button when count > 1", () => {
    const { isAtMin, isAtMax } = renderHook(() =>
      usePaginationState({ count: 2 }),
    ).result.current;

    expect(isAtMin).toBe(true);
    expect(isAtMax).toBe(false);
  });

  it("should have disabled next button if defaultPage === count & enabled previous button", () => {
    const { isAtMin, isAtMax } = renderHook(() =>
      usePaginationState({ count: 2, defaultPage: 2 }),
    ).result.current;

    expect(isAtMin).toBe(false);
    expect(isAtMax).toBe(true);
  });

  it("has no ellipses when count <= 7", () => {
    const { pages } = renderHook(() =>
      usePaginationState({ count: 7 }),
    ).result.current;

    expect(pages).not.toContain("end-ellipsis");
  });

  it("should have end-ellipses when count >= 8", () => {
    const { pages } = renderHook(() =>
      usePaginationState({ count: 8 }),
    ).result.current;

    expect(pages).toContain("end-ellipsis");
  });

  it("should have start-ellipses when defaultPage >= 5", () => {
    const { pages } = renderHook(() =>
      usePaginationState({ count: 8, defaultPage: 5 }),
    ).result.current;

    expect(pages).toContain("start-ellipsis");
  });

  it("should have start-ellipses & end-ellipsis when count >= 5", () => {
    const { pages } = renderHook(() =>
      usePaginationState({ count: 9, defaultPage: 5 }),
    ).result.current;

    expect(pages).toContain("start-ellipsis");
    expect(pages).toContain("end-ellipsis");
  });

  it("should have proper boundryCount", () => {
    const {
      result: {
        current: { pages },
      },
    } = renderHook(() =>
      usePaginationState({
        count: 40,
        boundaryCount: 5,
        defaultPage: 20,
      }),
    );

    expect(pages).toHaveLength(15);
    expect(pages.slice(0, 6)).toEqual([1, 2, 3, 4, 5, "start-ellipsis"]);
    expect(pages.slice(-6)).toEqual(["end-ellipsis", 36, 37, 38, 39, 40]);
  });

  it("should have proper siblingCount", () => {
    const {
      result: {
        current: { pages },
      },
    } = renderHook(() =>
      usePaginationState({
        count: 11,
        siblingCount: 2,
        defaultPage: 6,
      }),
    );

    expect(pages).toHaveLength(9);
    expect(pages).toEqual([
      1,
      "start-ellipsis",
      4, // siblings
      5, // siblings
      6, // default page
      7, // siblings
      8, // siblings
      "end-ellipsis",
      11,
    ]);
  });
});
