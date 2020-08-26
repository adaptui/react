import { useEffect } from "react";
import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  FocusRingProps,
  useFocusRing as useAriaFocusRing,
} from "@react-aria/focus";

interface useFocusRingOptions extends FocusRingProps {
  onFocusRingChange?: (isFocused: boolean) => void;
  onFocusRingVisibleChange?: (isFocusVisible: boolean) => void;
}

export const useFocusRing = createHook<useFocusRingOptions, BoxHTMLProps>({
  name: "useFocusRing",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(options, htmlProps) {
    const {
      onFocusRingChange,
      onFocusRingVisibleChange,
      ...restOptions
    } = options;

    const { focusProps, isFocused, isFocusVisible } = useAriaFocusRing(
      restOptions,
    );

    useEffect(() => {
      onFocusRingChange?.(isFocused);
    }, [isFocused, onFocusRingChange]);

    useEffect(() => {
      onFocusRingVisibleChange?.(isFocusVisible);
    }, [isFocusVisible, onFocusRingVisibleChange]);

    return mergeProps(htmlProps, focusProps);
  },
});

export const FocusRing = createComponent({
  as: "div",
  memo: true,
  useHook: useFocusRing,
});
