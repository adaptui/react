import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { useForkRef } from "reakit-utils";

import { createComponent, createHook } from "../system";

import { POPOVER_ANCHOR_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverAnchorOptions = RoleOptions &
  Pick<PopoverStateReturn, "setAnchor">;

export type PopoverAnchorHTMLProps = RoleHTMLProps;

export type PopoverAnchorProps = PopoverAnchorOptions & PopoverAnchorHTMLProps;

export const usePopoverAnchor = createHook<
  PopoverAnchorOptions,
  PopoverAnchorHTMLProps
>({
  name: "PopoverAnchor",
  compose: useRole,
  keys: POPOVER_ANCHOR_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    const { setAnchor } = options;
    const { ref: htmlRef, ...restHtmlProps } = htmlProps;

    return {
      ref: useForkRef(setAnchor, htmlRef),
      ...restHtmlProps,
    };
  },
});

export const PopoverAnchor = createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverAnchor,
});
