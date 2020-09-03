import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  FocusWithinProps,
  useFocusWithin as useAriaFocusWithin,
} from "@react-aria/interactions";

import { INTERACTION_KEYS } from "./__keys";

export const useFocusWithin = createHook<FocusWithinProps, BoxHTMLProps>({
  name: "FocusWithin",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(options, htmlProps) {
    const { focusWithinProps } = useAriaFocusWithin(options);

    return mergeProps(focusWithinProps, htmlProps);
  },
});

export const FocusWithin = createComponent({
  as: "div",
  memo: true,
  useHook: useFocusWithin,
});
