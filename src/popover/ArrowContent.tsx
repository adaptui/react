import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef } from "reakit-utils";

import { POPOVER_DISCLOSURE_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type ArrowContentOptions = RoleOptions &
  Pick<PopoverStateReturn, "setArrow">;

export type ArrowContentHTMLProps = RoleHTMLProps;

export type ArrowContentProps = ArrowContentOptions & ArrowContentHTMLProps;

export const useArrowContent = createHook<
  ArrowContentOptions,
  ArrowContentHTMLProps
>({
  name: "ArrowContent",
  compose: useRole,
  keys: POPOVER_DISCLOSURE_KEYS,

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

export const ArrowContent = createComponent({
  as: "div",
  memo: true,
  useHook: useArrowContent,
});
