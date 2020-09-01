import * as React from "react";
import { useForkRef } from "reakit-utils";
import { BoxHTMLProps, useBox } from "reakit";
import { mergeProps } from "@react-aria/utils";
import { ToggleState } from "@react-stately/toggle";
import { useToggleButton } from "@react-aria/button";
import { INTERACTION_KEYS } from "../interactions/__keys";
import { createComponent, createHook } from "reakit-system";
import { AriaToggleButtonProps } from "@react-types/button";

type useAriaToggleButtonOptions = AriaToggleButtonProps & ToggleState;

export const useAriaToggleButton = createHook<
  useAriaToggleButtonOptions,
  BoxHTMLProps
>({
  name: "AriaToggleButton",
  keys: [...INTERACTION_KEYS, "isSelected", "setSelected", "toggle"],
  compose: [useBox],

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const { isSelected, setSelected, toggle, ...restOptions } = options;
    const props = { ...restOptions, ...htmlProps } as AriaToggleButtonProps;
    const state = { isSelected, setSelected, toggle } as ToggleState;
    const ref = React.useRef<HTMLElement>(null);

    const { buttonProps } = useToggleButton(props, state, ref);

    return mergeProps(htmlProps, {
      ...buttonProps,
      ref: useForkRef(ref, htmlRef),
    });
  },
});

export const AriaToggleButton = createComponent({
  as: "button",
  memo: true,
  useHook: useAriaToggleButton,
});
