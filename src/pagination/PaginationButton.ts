import { callAllHandlers, isNumber } from "@chakra-ui/utils";
import React from "react";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { PAGINATION_ITEM_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type PaginationButtonOptions = ButtonOptions &
  Pick<
    PaginationStateReturn,
    | "currentPage"
    | "move"
    | "next"
    | "prev"
    | "first"
    | "last"
    | "isAtMax"
    | "isAtMin"
  > & {
    goto: string | number;
    getAriaLabel?: (goto: string | number, isCurrent: boolean) => string;
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
  keys: PAGINATION_ITEM_KEYS,

  useOptions(options, { disabled: htmlDisabled }) {
    const { goto, isAtMax, isAtMin } = options;
    let disabled = false;

    if (goto === "next" || goto === "last") {
      disabled = isAtMax;
    }

    if (goto === "prev" || goto === "first") {
      disabled = isAtMin;
    }

    return {
      disabled: htmlDisabled || disabled,
      ...options,
    };
  },

  useProps(
    { currentPage, move, last, first, next, prev, goto, getAriaLabel },
    { onClick: htmlOnClick, ...htmlProps },
  ) {
    const isCurrent = currentPage === goto;

    const onClick = React.useCallback(() => {
      switch (goto) {
        case "next":
          next?.();
          break;

        case "prev":
          prev?.();
          break;

        case "first":
          first?.();
          break;

        case "last":
          last?.();
          break;

        default:
          if (isNumber(goto)) {
            move?.(goto);
          }
          break;
      }
    }, [goto, next, prev, first, last, move]);

    const ariaLabel =
      getAriaLabel?.(goto, isCurrent) ?? isCurrent
        ? `Page ${goto}`
        : `Go to ${goto} Page`;

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
