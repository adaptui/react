import { useLiveRef } from "reakit-utils";
import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  KeyboardProps,
  useKeyboard as useAriaKeyboard,
} from "@react-aria/interactions";

export const useKeyboard = createHook<KeyboardProps, BoxHTMLProps>({
  name: "useKeyboard",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(
    options,
    { onKeyDown: htmlOnKeonKeyDown, onKeyUp: htmlOnKeyUp, ...htmlProps },
  ) {
    const onKeyDownRef = useLiveRef(htmlOnKeonKeyDown);
    const onKeyUpRef = useLiveRef(htmlOnKeyUp);
    const props = {
      ...options,
      onKeyDown: onKeyDownRef.current,
      onKeyUp: onKeyUpRef.current,
    };

    const { keyboardProps } = useAriaKeyboard(props);

    return mergeProps(htmlProps, keyboardProps);
  },
});

export const Keyboard = createComponent({
  as: "div",
  memo: true,
  useHook: useKeyboard,
});
