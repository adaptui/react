import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { PAGINATION_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type PaginationOptions = RoleOptions & PaginationStateReturn;

export type PaginationHTMLProps = RoleHTMLProps;

export type PaginationProps = PaginationOptions & PaginationHTMLProps;

export const usePagination = createHook<PaginationOptions, PaginationHTMLProps>(
  {
    name: "Pagination",
    compose: useRole,
    keys: PAGINATION_KEYS,

    useProps(_, htmlProps) {
      return { "aria-label": "pagination navigation", ...htmlProps };
    },
  },
);

export const Pagination = createComponent({
  as: "nav",
  memo: true,
  useHook: usePagination,
});
