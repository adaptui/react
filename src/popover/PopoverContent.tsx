import { useForkRef } from "reakit-utils";

import { DialogHTMLProps, DialogOptions, useDialog } from "../dialog";
import { createComponent, createHook } from "../system";

import { POPOVER_DISCLOSURE_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverContentOptions = DialogOptions &
  Pick<PopoverStateReturn, "setPopper">;

export type PopoverContentHTMLProps = DialogHTMLProps;

export type PopoverContentProps = PopoverContentOptions &
  PopoverContentHTMLProps;

export const usePopoverContent = createHook<
  PopoverContentOptions,
  PopoverContentHTMLProps
>({
  name: "PopoverContent",
  compose: useDialog,
  keys: POPOVER_DISCLOSURE_KEYS,

  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },

  useProps(options, htmlProps) {
    const { setPopper } = options;
    const { ref: htmlRef, ...restHtmlProps } = htmlProps;

    return {
      ref: useForkRef(setPopper, htmlRef),
      ...restHtmlProps,
    };
  },
});

export const PopoverContent = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverContent,
});
