import { callAllHandlers, isNumber } from "@chakra-ui/utils";
import React from "react";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { PAGINATION_ITEM_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type PaginationItemOptions = ButtonOptions &
  Pick<PaginationStateReturn, "currentPage" | "goTo"> & {
    page: string | number;
    getAriaLabel?: (page: string | number, isCurrent: boolean) => string;
  };

export type PaginationItemHTMLProps = ButtonHTMLProps;

export type PaginationItemProps = PaginationItemOptions &
  PaginationItemHTMLProps;

export const usePaginationItem = createHook<
  PaginationItemOptions,
  PaginationItemHTMLProps
>({
  name: "PaginationItem",
  compose: useButton,
  keys: PAGINATION_ITEM_KEYS,

  useProps(
    { currentPage, goTo, page, getAriaLabel },
    { onClick: htmlOnClick, ...htmlProps },
  ) {
    const isCurrent = currentPage === page;

    const onClick = React.useCallback(() => {
      if (isNumber(page)) {
        goTo?.(page);
      }
    }, [goTo, page]);

    const ariaLabel =
      getAriaLabel?.(page, isCurrent) ?? isCurrent
        ? `Page ${page}`
        : `Go to Page ${page}`;

    return {
      "aria-label": ariaLabel,
      "aria-current": isCurrent ? true : undefined,
      onClick: callAllHandlers(onClick, htmlOnClick),
      ...htmlProps,
    };
  },
});

export const PaginationItem = createComponent({
  as: "button",
  memo: true,
  useHook: usePaginationItem,
});
