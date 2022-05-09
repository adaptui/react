import { MouseEvent } from "react";
import { isNumber } from "@chakra-ui/utils";
import { useEvent, useStore } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { PaginationContextState } from "./__utils";
import { PaginationState } from "./pagination-state";

export const usePaginationButton = createHook<PaginationButtonOptions>(
  ({ state, goto, ...props }) => {
    state = useStore(state || PaginationContextState, [
      "isAtFirstPage",
      "isAtLastPage",
      "currentPage",
    ]);

    if (!state) return props;

    const { isAtLastPage, isAtFirstPage, currentPage } = state;
    const isCurrent = currentPage === goto;
    let disabled = false;

    if (goto === "nextPage" || goto === "lastPage") {
      disabled = isAtLastPage;
    }

    if (goto === "prevPage" || goto === "firstPage") {
      disabled = isAtFirstPage;
    }

    disabled = props.disabled || disabled;

    const ariaLabel = isCurrent
      ? `Page ${goto}`
      : `Go to ${goto === "prevPage" ? "previous" : goto} Page`;

    const onClickProp = props.onClick;

    const onClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
      onClickProp?.(event);
      if (event.defaultPrevented) return;
      if (disabled) return;

      if (isNumber(goto)) {
        state?.movePage?.(goto);
        return;
      }

      if (["nextPage", "prevPage", "lastPage", "firstPage"].includes(goto)) {
        state?.[goto]?.();
        return;
      }
    });

    props = {
      "aria-label": ariaLabel,
      "aria-current": isCurrent ? true : undefined,
      disabled,
      onClick,
      ...props,
    };

    return props;
  },
);

export const PaginationButton = createComponent<PaginationButtonOptions>(
  props => {
    const htmlProps = usePaginationButton(props);

    return createElement("button", htmlProps);
  },
);

export type Goto = "nextPage" | "prevPage" | "lastPage" | "firstPage" | number;

export type PaginationButtonOptions<T extends As = "button"> = Options<T> & {
  /**
   * Object returned by the `usePaginationButtonState` hook.
   */
  state?: PaginationState;
  goto: Goto;
};

export type PaginationButtonProps<T extends As = "button"> = Props<
  PaginationButtonOptions<T>
>;
