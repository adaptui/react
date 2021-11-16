import { createComponent, createHook } from "reakit-system";

import { DialogHTMLProps, DialogOptions, useDialog } from "../dialog";

import { POPOVER_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverOptions = DialogOptions &
  Pick<PopoverStateReturn, "popperStyles">;

export type PopoverHTMLProps = DialogHTMLProps;

export type PopoverProps = PopoverOptions & PopoverHTMLProps;

export const usePopover = createHook<PopoverOptions, PopoverHTMLProps>({
  name: "Popover",
  compose: useDialog,
  keys: POPOVER_KEYS,

  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },

  useProps(options, htmlProps) {
    const { popperStyles } = options;
    const { style: htmlStyle, ...restHtmlProps } = htmlProps;

    return {
      style: {
        ...popperStyles,
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
