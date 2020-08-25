import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import { HoverProps, useHover as useAriaHover } from "@react-aria/interactions";

export const useHover = createHook<HoverProps, BoxHTMLProps>({
  name: "useHover",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(options, htmlProps) {
    const { hoverProps } = useAriaHover(options);

    return mergeProps(htmlProps, hoverProps);
  },
});

export const Hover = createComponent({
  as: "div",
  memo: true,
  useHook: useHover,
});
