import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  PressHookProps,
  usePress as useAriaPress,
} from "@react-aria/interactions";

import { INTERACTION_KEYS } from "./__keys";

export const usePress = createHook<PressHookProps, BoxHTMLProps>({
  name: "Press",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(options, htmlProps) {
    const { pressProps } = useAriaPress(options);

    return mergeProps(pressProps, htmlProps);
  },
});

export const Press = createComponent({
  as: "div",
  memo: true,
  useHook: usePress,
});
