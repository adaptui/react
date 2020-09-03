import React from "react";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  FocusableOptions,
  useFocusable as useAriaFocusable,
} from "@react-aria/focus";

import { INTERACTION_KEYS } from "./__keys";

export const useFocusable = createHook<FocusableOptions, BoxHTMLProps>({
  name: "Focusable",
  compose: useBox,
  keys: INTERACTION_KEYS,

  useProps(options, htmlProps) {
    const props = { ...options, ...htmlProps };
    const ref = React.useRef<HTMLElement>(null);

    const { focusableProps } = useAriaFocusable(props, ref);

    return mergeProps(focusableProps, htmlProps);
  },
});

export const Focusable = createComponent({
  as: "div",
  memo: true,
  useHook: useFocusable,
});
