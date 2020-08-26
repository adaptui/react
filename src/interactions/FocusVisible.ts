/**
 * All credit goes to React Aria(https://react-spectrum.adobe.com/react-aria/index.html)
 * We improved the hook [useFocusVisible](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/interactions/src/useFocusVisible.ts)
 * to work with Reakit System
 */
import { useEffect } from "react";
import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import {
  FocusVisibleProps,
  useFocusVisible as useAriaFocusVisible,
} from "@react-aria/interactions";
import { createComponent, createHook } from "reakit-system";

interface useFocusVisibleOptions extends FocusVisibleProps {
  onFocusVisibleChange?: (isFocusVisible: boolean) => void;
}

export const useFocusVisible = createHook<useFocusVisibleOptions, BoxHTMLProps>(
  {
    name: "useFocusVisible",
    keys: INTERACTION_KEYS,
    compose: [useBox],

    useProps(options, htmlProps) {
      const { onFocusVisibleChange, ...restOptions } = options;
      const { isFocusVisible } = useAriaFocusVisible(restOptions);

      useEffect(() => {
        onFocusVisibleChange?.(isFocusVisible);
      }, [isFocusVisible, onFocusVisibleChange]);

      return htmlProps;
    },
  },
);

export const FocusVisible = createComponent({
  as: "div",
  memo: true,
  useHook: useFocusVisible,
});
