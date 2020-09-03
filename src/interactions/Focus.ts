import { useLiveRef } from "reakit-utils";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import { FocusProps, useFocus as useAriaFocus } from "@react-aria/interactions";

import { INTERACTION_KEYS } from "./__keys";

export const useFocus = createHook<FocusProps, BoxHTMLProps>({
  name: "Focus",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(
    options,
    { onFocus: htmlOnFocus, onBlur: htmlOnBlur, ...htmlProps },
  ) {
    const onFocusRef = useLiveRef(htmlOnFocus);
    const onBlurRef = useLiveRef(htmlOnBlur);
    const props = {
      ...options,
      onFocus: onFocusRef.current,
      onBlur: onBlurRef.current,
    };

    const { focusProps } = useAriaFocus(props);

    return mergeProps(focusProps, htmlProps);
  },
});

export const Focus = createComponent({
  as: "div",
  memo: true,
  useHook: useFocus,
});
