import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useStoreProvider } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";

import { PaginationContextState } from "./__utils";
import { PaginationState } from "./pagination-state";

export const usePagination = createHook<PaginationOptions>(
  ({ state, ...props }) => {
    props = useStoreProvider({ state, ...props }, PaginationContextState);
    props = { "aria-label": "pagination", ...props };

    return props;
  },
);

export const Pagination = createComponent<PaginationOptions>(props => {
  const htmlProps = usePagination(props);

  return createElement("div", htmlProps);
});

export type PaginationOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `usePaginationState` hook.
   */
  state: PaginationState;
};

export type PaginationProps<T extends As = "div"> = Props<PaginationOptions<T>>;
