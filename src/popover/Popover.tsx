import { CSSProperties } from "react";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";

import { createComponent, createHook } from "../system";

import { POPOVER_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverOptions = RoleOptions &
  Pick<PopoverStateReturn, "popperStyles">;

export type PopoverHTMLProps = RoleHTMLProps;

export type PopoverProps = PopoverOptions & PopoverHTMLProps;

export const usePopover = createHook<PopoverOptions, PopoverHTMLProps>({
  name: "Popover",
  compose: useRole,
  keys: POPOVER_KEYS,

  useProps(options, htmlProps) {
    const { popperStyles } = options;
    const { style: htmlStyle, ...restHtmlProps } = htmlProps;

    return {
      style: {
        ...(popperStyles as CSSProperties),
        ...htmlStyle,
      },
      ...restHtmlProps,
    };
  },
});

export const Popover = createComponent({
  as: "div",
  memo: true,
  useHook: usePopover,
});
