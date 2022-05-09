/**
 * Thanks to [Material UI](https://material-ui.com/)
 * Based on the logic from [usePagination Hook](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Pagination/usePagination.js)
 */
import React, { useMemo } from "react";
import { useControlledState, useStorePublisher } from "ariakit-utils";

export const usePaginationState = (
  props: PaginationStateProps = {},
): PaginationState => {
  const {
    defaultPage = 1,
    page: currentPageProp,
    onChange,
    count = 1,
    boundaryCount = 1,
    siblingCount = 1,
  } = props;

  const [currentPage, setCurrentPage] = useControlledState(
    defaultPage,
    currentPageProp,
    onChange,
  );

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages[0] - 2,
  );

  // Page to render
  // e.g. pages = [1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]
  const pages = useMemo(
    () => [
      ...startPages,

      // Start ellipsis
      ...(siblingsStart > boundaryCount + 2
        ? ["start-ellipsis"]
        : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

      // Sibling pages
      ...range(siblingsStart, siblingsEnd),

      // End ellipsis
      ...(siblingsEnd < count - boundaryCount - 1
        ? ["end-ellipsis"]
        : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

      ...endPages,
    ],
    [boundaryCount, count, endPages, siblingsEnd, siblingsStart, startPages],
  );

  const nextPage = React.useCallback(() => {
    setCurrentPage(prevPage => prevPage + 1);
  }, [setCurrentPage]);

  const prevPage = React.useCallback(() => {
    setCurrentPage(prevPage => prevPage - 1);
  }, [setCurrentPage]);

  const firstPage = React.useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const lastPage = React.useCallback(() => {
    setCurrentPage(count);
  }, [count, setCurrentPage]);

  const movePage = React.useCallback(
    (page: number) => {
      if (page >= 1 && page <= count) setCurrentPage(page);
    },
    [count, setCurrentPage],
  );

  const isAtLastPage = currentPage >= count;
  const isAtFirstPage = currentPage <= 1;

  const state = useMemo(
    () => ({
      pages,
      currentPage,
      isAtLastPage,
      isAtFirstPage,
      nextPage,
      prevPage,
      movePage,
      firstPage,
      lastPage,
    }),
    [
      pages,
      currentPage,
      isAtLastPage,
      isAtFirstPage,
      nextPage,
      prevPage,
      movePage,
      firstPage,
      lastPage,
    ],
  );

  return useStorePublisher(state);
};

function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, i) => start + i);
}

export type PaginationState = {
  /**
   * The current active page
   */
  currentPage: number;
  /**
   * All the page with start & end ellipsis
   */
  pages: (string | number)[];
  /**
   * True, if the currentPage is at first page
   */
  isAtFirstPage: boolean;
  /**
   * True, if the currentPage is at last page
   */
  isAtLastPage: boolean;
  /**
   * Go to the specified page number
   */
  movePage: (page: number) => void;
  /**
   * Go to next page
   */
  nextPage: () => void;
  /**
   * Go to previous page
   */
  prevPage: () => void;
  /**
   * Go to first page
   */
  firstPage: () => void;
  /**
   * Go to last page
   */
  lastPage: () => void;
};

export type PaginationStateProps = {
  /**
   * Set the default page(uncontrollable)
   *
   * @default 1
   */
  defaultPage?: number;
  /**
   * Set the page(controllable)
   */
  page?: number;
  /**
   *
   */
  onChange?: (page: number) => void;
  /**
   * Total no. of pages
   *
   * @default 1
   */
  count?: number;
  /**
   * No. of boundary pages to be visible
   *
   * @default 1
   */
  boundaryCount?: number;
  /**
   * No. of sibiling pages allowed before/after the current page
   *
   * @default 1
   */
  siblingCount?: number;
};
