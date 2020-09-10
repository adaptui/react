import React from "react";
import { createComponent, createHook } from "reakit-system";
import { callAllHandlers, isNumber } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { PAGINATION_ITEM_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type TGoto = "next" | "prev" | "last" | "first" | number;

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
    goto: TGoto;
    getAriaLabel?: (goto: TGoto, isCurrent: boolean) => string;
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

  useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
    const { currentPage, goto, getAriaLabel } = options;
    const isCurrent = currentPage === goto;

    const onClick = React.useCallback(() => {
      if (isNumber(goto)) {
        options.move?.(goto);
      } else {
        options[goto]?.();
      }
    }, [goto, options]);

    const ariaLabel =
      getAriaLabel?.(goto, isCurrent) ?? isCurrent
        ? `Page ${goto}`
        : `Go to ${goto === "prev" ? "previous" : goto} Page`;

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
