import * as React from "react";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { callAllHandlers, isNumber } from "@chakra-ui/utils";

import { PAGINATION_BUTTON_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type TGoto = "nextPage" | "prevPage" | "lastPage" | "firstPage" | number;

export type PaginationButtonOptions = ButtonOptions &
  Pick<
    PaginationStateReturn,
    | "currentPage"
    | "movePage"
    | "nextPage"
    | "prevPage"
    | "firstPage"
    | "lastPage"
    | "isAtLastPage"
    | "isAtFirstPage"
  > & {
    goto: TGoto;
  };

export type PaginationButtonHTMLProps = ButtonHTMLProps;

export type PaginationButtonProps = PaginationButtonOptions &
  PaginationButtonHTMLProps;

export const usePaginationButton = createHook<
  PaginationButtonOptions,
  PaginationButtonHTMLProps
>({
  name: "PaginationButton",
  compose: useButton,
  keys: PAGINATION_BUTTON_KEYS,

  useOptions(options, { disabled: htmlDisabled }) {
    const { goto, isAtLastPage, isAtFirstPage } = options;
    let disabled = false;

    if (goto === "nextPage" || goto === "lastPage") {
      disabled = isAtLastPage;
    }

    if (goto === "prevPage" || goto === "firstPage") {
      disabled = isAtFirstPage;
    }

    return {
      disabled: htmlDisabled || disabled,
      ...options,
    };
  },

  useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
    const { currentPage, goto } = options;
    const isCurrent = currentPage === goto;

    const onClick = React.useCallback(() => {
      if (options.disabled) return;

      if (isNumber(goto)) {
        options.movePage?.(goto);
        return;
      }

      if (["nextPage", "prevPage", "lastPage", "firstPage"].includes(goto)) {
        options[goto]?.();
        return;
      }
    }, [goto, options]);

    const ariaLabel = isCurrent
      ? `Page ${goto}`
      : `Go to ${goto === "prevPage" ? "previous" : goto} Page`;

    return {
      "aria-label": ariaLabel,
      "aria-current": isCurrent ? true : undefined,
      onClick: callAllHandlers(onClick, htmlOnClick),
      ...htmlProps,
    };
  },
});

export const PaginationButton = createComponent({
  as: "button",
  memo: true,
  useHook: usePaginationButton,
});
