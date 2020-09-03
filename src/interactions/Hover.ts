import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import { HoverProps, useHover as useAriaHover } from "@react-aria/interactions";

import { INTERACTION_KEYS } from "./__keys";

export const useHover = createHook<HoverProps, BoxHTMLProps>({
  name: "Hover",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(options, htmlProps) {
    const { hoverProps } = useAriaHover(options);

    return mergeProps(hoverProps, htmlProps);
  },
});

export const Hover = createComponent({
  as: "div",
  memo: true,
  useHook: useHover,
});
