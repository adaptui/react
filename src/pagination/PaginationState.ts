/**
 * Thanks to [Material UI](https://material-ui.com/)
 * Based on the logic from [usePagination Hook](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Pagination/usePagination.js)
 */
import React from "react";
import { useControllableState } from "@chakra-ui/hooks";

export interface UsePaginationProps {
  count?: number;
  defaultPage?: number;
  boundaryCount?: number;
  page?: number;
  siblingCount?: number;
  onChange?(value: number): void;
}

export const usePaginationState = (props: UsePaginationProps = {}) => {
  const {
    count = 10,
    defaultPage = 1,
    boundaryCount = 1,
    siblingCount = 1,
    page: currentPage,
    onChange,
  } = props;

  const [page, setPage] = useControllableState({
    value: currentPage,
    defaultValue: defaultPage,
    onChange,
    shouldUpdate: (prev, next) => prev !== next,
  });

  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages[0] - 2,
  );

  // Page to render
  // e.g. pages = [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
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

  const next = React.useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const prev = React.useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  const first = React.useCallback(() => {
    setPage(1);
  }, [setPage]);

  const last = React.useCallback(() => {
    setPage(count);
  }, [count, setPage]);

  return {
    currentPage: page,
    isAtMax: page >= count,
    isAtMin: page <= 1,
    next,
    prev,
    goTo: setPage,
    first,
    last,
    pages,
  };
};

export type PaginationStateReturn = ReturnType<typeof usePaginationState>;
