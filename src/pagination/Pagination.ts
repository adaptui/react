import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { PAGINATION_STATE_KEYS } from "./__keys";

export type PaginationOptions = BoxOptions;

export type PaginationHTMLProps = BoxHTMLProps;

export type PaginationProps = PaginationOptions & PaginationHTMLProps;

export const usePagination = createHook<PaginationOptions, PaginationHTMLProps>(
  {
    name: "Pagination",
    compose: useBox,
    keys: PAGINATION_STATE_KEYS,

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
