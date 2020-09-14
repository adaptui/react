import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

export type PaginationOptions = BoxOptions;

export type PaginationHTMLProps = BoxHTMLProps;

export type PaginationProps = PaginationOptions & PaginationHTMLProps;

export const usePagination = createHook<PaginationOptions, PaginationHTMLProps>(
  {
    name: "Pagination",
    compose: useBox,

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
