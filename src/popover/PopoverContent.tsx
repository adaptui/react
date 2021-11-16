import { createComponent, createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef } from "reakit-utils";

import { POPOVER_DISCLOSURE_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverContentOptions = RoleOptions &
  Pick<PopoverStateReturn, "setPopper">;

export type PopoverContentHTMLProps = RoleHTMLProps;

export type PopoverContentProps = PopoverContentOptions &
  PopoverContentHTMLProps;

export const usePopoverContent = createHook<
  PopoverContentOptions,
  PopoverContentHTMLProps
>({
  name: "PopoverContent",
  compose: useRole,
  keys: POPOVER_DISCLOSURE_KEYS,

  useOptions(options, htmlProps) {
    return options;
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
