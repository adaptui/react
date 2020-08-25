import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  FocusWithinProps,
  useFocusWithin as useAriaFocusWithin,
} from "@react-aria/interactions";

export const useFocusWithin = createHook<FocusWithinProps, BoxHTMLProps>({
  name: "useFocusWithin",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(options, htmlProps) {
    const { focusWithinProps } = useAriaFocusWithin(options);

    return mergeProps(htmlProps, focusWithinProps);
  },
});

export const FocusWithin = createComponent({
  as: "div",
  memo: true,
  useHook: useFocusWithin,
});
