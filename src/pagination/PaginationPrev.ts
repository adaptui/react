import { callAllHandlers } from "@chakra-ui/utils";
import React from "react";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { PAGINATION_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type PaginationPrevOptions = ButtonOptions &
  Pick<PaginationStateReturn, "isAtMin" | "prev">;

export type PaginationPrevHTMLProps = ButtonHTMLProps;

export type PaginationPrevProps = PaginationPrevOptions &
  PaginationPrevHTMLProps;

export const usePaginationPrev = createHook<
  PaginationPrevOptions,
  PaginationPrevHTMLProps
>({
  name: "PaginationPrev",
  compose: useButton,
  keys: PAGINATION_KEYS,

  useOptions(options, htmlProps) {
    return { disabled: htmlProps.disabled || options.isAtMin, ...options };
  },

  useProps({ prev }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      "aria-label": "Previous Page",
      onClick: callAllHandlers(htmlOnClick, prev),
      ...htmlProps,
    };
  },
});

export const PaginationPrev = createComponent({
  as: "button",
  memo: true,
  useHook: usePaginationPrev,
});
