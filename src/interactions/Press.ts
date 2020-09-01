import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  PressHookProps,
  usePress as useAriaPress,
} from "@react-aria/interactions";

export const usePress = createHook<PressHookProps, BoxHTMLProps>({
  name: "Press",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(options, htmlProps) {
    const { pressProps } = useAriaPress(options);

    return mergeProps(htmlProps, pressProps);
  },
});

export const Press = createComponent({
  as: "div",
  memo: true,
  useHook: usePress,
});
