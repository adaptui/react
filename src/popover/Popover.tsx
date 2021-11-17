import { createComponent, createHook } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";

import { POPOVER_KEYS } from "./__keys";
import { PopoverStateReturn } from "./PopoverState";

export type PopoverOptions = BoxOptions &
  Pick<PopoverStateReturn, "popperStyles">;

export type PopoverHTMLProps = BoxHTMLProps;

export type PopoverProps = PopoverOptions & PopoverHTMLProps;

export const usePopover = createHook<PopoverOptions, PopoverHTMLProps>({
  name: "Popover",
  compose: useBox,
  keys: POPOVER_KEYS,

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
