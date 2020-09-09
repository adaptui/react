import React from "react";

export interface UsePaginationProps {
  totalItems?: number;
  perPage?: number;
  defaultPage?: number;
}

export const usePaginationState = (props: UsePaginationProps = {}) => {
  const {
    totalItems = 50,
    perPage = 10,
    defaultPage: currentPageProp = 1,
  } = props;

  const totalPages = Math.ceil(totalItems / perPage);
  console.log("%c totalPages", "color: #aa00ff", totalPages);

  const [currentPage, setCurrentPage] = React.useState(currentPageProp);

  const pages = Array(totalPages)
    .fill("")
    .map((_, i) => i + 1);

  const isAtMax = currentPage >= totalPages;
  const isAtMin = currentPage <= 1;

  const next = React.useCallback(() => {
    setCurrentPage(prevPage => prevPage + 1);
  }, []);

  const prev = React.useCallback(() => {
    setCurrentPage(prevPage => prevPage - 1);
  }, []);

  const goTo = React.useCallback(page => {
    setCurrentPage(page);
  }, []);

  return { currentPage, isAtMax, isAtMin, next, prev, goTo, pages };
};

export type PaginationStateReturn = ReturnType<typeof usePaginationState>;
