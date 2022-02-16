import { CSSProperties } from "react";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";

import { createComponent, createHook } from "../system";

import { POPOVER_ARROW_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverArrowOptions = RoleOptions &
  Pick<PopoverStateReturn, "arrowStyles">;

export type PopoverArrowHTMLProps = RoleHTMLProps;

export type PopoverArrowProps = PopoverArrowOptions & PopoverArrowHTMLProps;

export const usePopoverArrow = createHook<
  PopoverArrowOptions,
  PopoverArrowHTMLProps
>({
  name: "PopoverArrow",
  compose: useRole,
  keys: POPOVER_ARROW_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { arrowStyles } = options;
    const { style: htmlStyle, ...restHtmlProps } = htmlProps;

    return {
      style: {
        ...(arrowStyles as CSSProperties),
        pointerEvents: "none",
        ...htmlStyle,
      },
      ...restHtmlProps,
    };
  },
});

export const PopoverArrow = createComponent({
  as: "span",
  memo: true,
  useHook: usePopoverArrow,
});
