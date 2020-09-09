import React from "react";
import { callAllHandlers } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { PAGINATION_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type PaginationNextOptions = ButtonOptions & PaginationStateReturn;

export type PaginationNextHTMLProps = ButtonHTMLProps;

export type PaginationNextProps = PaginationNextOptions &
  PaginationNextHTMLProps;

export const usePaginationNext = createHook<
  PaginationNextOptions,
  PaginationNextHTMLProps
>({
  name: "PaginationNext",
  compose: useButton,
  keys: PAGINATION_KEYS,

  useOptions(options, htmlProps) {
    return { disabled: htmlProps.disabled || options.isAtMax, ...options };
  },

  useProps({ next }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      "aria-label": "Next Page",
      onClick: callAllHandlers(htmlOnClick, next),
      ...htmlProps,
    };
  },
});

export const PaginationNext = createComponent({
  as: "button",
  memo: true,
  useHook: usePaginationNext,
});
