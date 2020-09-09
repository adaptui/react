import { callAllHandlers } from "@chakra-ui/utils";
import React from "react";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { PAGINATION_KEYS } from "./__keys";
import { PaginationStateReturn } from "./PaginationState";

export type PaginationItemOptions = ButtonOptions &
  PaginationStateReturn & {
    page: number;
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
  keys: PAGINATION_KEYS,

  useProps(
    { currentPage, page, goTo },
    { onClick: htmlOnClick, ...htmlProps },
  ) {
    const isCurrent = currentPage === page;

    const onClick = React.useCallback(() => {
      if (!isCurrent) {
        goTo?.(page);
      }
    }, [goTo, isCurrent, page]);

    return {
      "aria-label": isCurrent ? `Page ${page}` : `Go to Page ${page}`,
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
