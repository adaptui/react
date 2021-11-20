import { createComponent, createHook } from "reakit-system";

import {
  PopoverAnchorHTMLProps,
  PopoverAnchorOptions,
  usePopoverAnchor,
} from "../popover";

import { TOOLTIP_ANCHOR_KEYS } from "./__keys";
import { TooltipStateReturn } from "./TooltipState";

export type TooltipAnchorOptions = PopoverAnchorOptions &
  Pick<TooltipStateReturn, "setAnchor">;

export type TooltipAnchorHTMLProps = PopoverAnchorHTMLProps;

export type TooltipAnchorProps = TooltipAnchorOptions & TooltipAnchorHTMLProps;

export const useTooltipAnchor = createHook<
  TooltipAnchorOptions,
  TooltipAnchorHTMLProps
>({
  name: "TooltipAnchor",
  compose: usePopoverAnchor,
  keys: TOOLTIP_ANCHOR_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const TooltipAnchor = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltipAnchor,
});
