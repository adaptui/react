import { createComponent, createHook } from "reakit-system";

import {
  PopoverArrowContentHTMLProps,
  PopoverArrowContentOptions,
  usePopoverArrowContent,
} from "../popover/PopoverArrowContent";

import { TOOLTIP_ARROW_CONTENT_KEYS } from "./__keys";

export type TooltipArrowContentOptions = PopoverArrowContentOptions;

export type TooltipArrowContentHTMLProps = PopoverArrowContentHTMLProps;

export type TooltipArrowContentProps = TooltipArrowContentOptions &
  TooltipArrowContentHTMLProps;

export const useTooltipArrowContent = createHook<
  TooltipArrowContentOptions,
  TooltipArrowContentHTMLProps
>({
  name: "TooltipArrowContent",
  compose: usePopoverArrowContent,
  keys: TOOLTIP_ARROW_CONTENT_KEYS,

  useOptions(options) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const TooltipArrowContent = createComponent({
  as: "div",
  memo: true,
  useHook: useTooltipArrowContent,
});
