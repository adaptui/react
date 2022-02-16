import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef } from "reakit-utils";

import { createComponent, createHook } from "../system";

import { POPOVER_ARROW_CONTENT_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverArrowContentOptions = RoleOptions &
  Pick<PopoverStateReturn, "setArrow">;

export type PopoverArrowContentHTMLProps = RoleHTMLProps;

export type PopoverArrowContentProps = PopoverArrowContentOptions &
  PopoverArrowContentHTMLProps;

export const usePopoverArrowContent = createHook<
  PopoverArrowContentOptions,
  PopoverArrowContentHTMLProps
>({
  name: "PopoverArrowContent",
  compose: useRole,
  keys: POPOVER_ARROW_CONTENT_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { setArrow } = options;
    const { ref: htmlRef, ...restHtmlProps } = htmlProps;

    return {
      ref: useForkRef(setArrow, htmlRef),
      ...restHtmlProps,
    };
  },
});

export const PopoverArrowContent = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverArrowContent,
});
