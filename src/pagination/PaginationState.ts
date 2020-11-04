/**
 * Thanks to [Material UI](https://material-ui.com/)
 * Based on the logic from [usePagination Hook](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Pagination/usePagination.js)
 */
import React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

export type PaginationState = {
  /**
   * The current active page
   *
   * @default 1
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
};

export type PaginationAction = {
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

export type PaginationInitialState = Pick<
  Partial<PaginationState>,
  "currentPage"
> & {
  /**
   * Total no. of pages
   */
  count?: number;
  /**
   * No. of boundary pages to be visible
   */
  boundaryCount?: number;
  /**
   * No. of sibiling pages allowed before/after the current page
   */
  siblingCount?: number;
};

export type PaginationStateReturn = PaginationState & PaginationAction;

export const usePaginationState = (
  props: SealedInitialState<PaginationInitialState> = {},
): PaginationStateReturn => {
  const {
    currentPage: initialCurrentPage = 1,
    count = 1,
    boundaryCount = 1,
    siblingCount = 1,
  } = useSealedState(props);

  const [currentPage, setCurrentPage] = React.useState(initialCurrentPage);

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
  const pages = [
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
  ];

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
    page => {
      if (page >= 1 && page <= count) setCurrentPage(page);
    },
    [count, setCurrentPage],
  );

  return {
    pages,
    currentPage,
    isAtLastPage: currentPage >= count,
    isAtFirstPage: currentPage <= 1,
    nextPage,
    prevPage,
    movePage,
    firstPage,
    lastPage,
  };
};

function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, i) => start + i);
}
