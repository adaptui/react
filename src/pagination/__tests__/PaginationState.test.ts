import { act, renderHook } from "reakit-test-utils/hooks";

import { usePaginationState } from "..";

describe("usePaginationState", () => {
  it("should render correctly", () => {
    const {
      result: { current },
    } = renderHook(() => usePaginationState({ count: 5 }));

    expect(current).toMatchInlineSnapshot(`
      Object {
        "currentPage": 1,
        "firstPage": [Function],
        "isAtFirstPage": true,
        "isAtLastPage": false,
        "lastPage": [Function],
        "movePage": [Function],
        "nextPage": [Function],
        "pages": Array [
          1,
          2,
          3,
          4,
          5,
        ],
        "prevPage": [Function],
      }
    `);
  });

  it("should rover to next/prev/last/first/move", async () => {
    const { result } = renderHook(() => usePaginationState({ count: 5 }));

    expect(result.current.isAtFirstPage).toBe(true);
    expect(result.current.isAtLastPage).toBe(false);
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.isAtFirstPage).toBe(false);
    expect(result.current.isAtLastPage).toBe(false);
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(3);

    // last
    act(() => {
      result.current.lastPage();
    });

    expect(result.current.isAtFirstPage).toBe(false);
    expect(result.current.isAtLastPage).toBe(true);
    expect(result.current.currentPage).toBe(5);

    // first
    act(() => {
      result.current.firstPage();
    });

    expect(result.current.isAtFirstPage).toBe(true);
    expect(result.current.isAtLastPage).toBe(false);
    expect(result.current.currentPage).toBe(1);

    // move
    act(() => {
      result.current.movePage(3);
    });

    expect(result.current.isAtFirstPage).toBe(false);
    expect(result.current.isAtLastPage).toBe(false);
    expect(result.current.currentPage).toBe(3);
  });

  it("has a disabled previous button & an enabled next button when count > 1", () => {
    const { isAtFirstPage, isAtLastPage } = renderHook(() =>
      usePaginationState({ count: 2 }),
    ).result.current;

    expect(isAtFirstPage).toBe(true);
    expect(isAtLastPage).toBe(false);
  });

  it("should have disabled next button if currentPage === count & enabled previous button", () => {
    const { isAtFirstPage, isAtLastPage } = renderHook(() =>
      usePaginationState({ count: 2, defaultPage: 2 }),
    ).result.current;

    expect(isAtFirstPage).toBe(false);
    expect(isAtLastPage).toBe(true);
  });

  it("has no ellipses when count <= 7", () => {
    const { pages } = renderHook(() => usePaginationState({ count: 7 })).result
      .current;

    expect(pages).not.toContain("end-ellipsis");
  });

  it("should have end-ellipses when count >= 8", () => {
    const { pages } = renderHook(() => usePaginationState({ count: 8 })).result
      .current;

    expect(pages).toContain("end-ellipsis");
  });

  it("should have start-ellipses when currentPage >= 5", () => {
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
