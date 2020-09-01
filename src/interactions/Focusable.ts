import React from "react";
import { INTERACTION_KEYS } from "./__keys";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  FocusableOptions,
  useFocusable as useAriaFocusable,
} from "@react-aria/focus";

export const useFocusable = createHook<FocusableOptions, BoxHTMLProps>({
  name: "Focusable",
  keys: INTERACTION_KEYS,
  compose: [useBox],

  useProps(options, htmlProps) {
    const props = { ...options, ...htmlProps };
    const ref = React.useRef<HTMLElement>(null);

    const { focusableProps } = useAriaFocusable(props, ref);

    return mergeProps(htmlProps, focusableProps);
  },
});

export const Focusable = createComponent({
  as: "div",
  memo: true,
  useHook: useFocusable,
});
