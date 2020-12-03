import { useWarning } from "reakit-warning";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { createComponent, createHook, useCreateElement } from "reakit-system";

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
  },
);

export const Pagination = createComponent({
  as: "nav",
  memo: true,
  useHook: usePagination,
  useCreateElement: (type, props, children) => {
    useWarning(
      !props["aria-label"] && !props["aria-labelledby"],
      "You should provide either `aria-label` or `aria-labelledby` props.",
    );
    return useCreateElement(type, props, children);
  },
});
