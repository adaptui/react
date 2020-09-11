import * as React from "react";
import { useForkRef } from "reakit-utils";
import { mergeProps } from "@react-aria/utils";
import { ToggleState } from "@react-stately/toggle";
import { useToggleButton } from "@react-aria/button";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { AriaToggleButtonProps as AriaToggleButtonOptionsTypes } from "@react-types/button";

import { INTERACTION_KEYS } from "../interactions/__keys";

export type AriaToggleButtonOptions = ButtonOptions &
  AriaToggleButtonOptionsTypes &
  ToggleState;

export type AriaToggleButtonHTMLProps = ButtonHTMLProps;

export type AriaToggleButtonProps = AriaToggleButtonOptions &
  AriaToggleButtonHTMLProps;

export const useAriaToggleButton = createHook<
  AriaToggleButtonOptions,
  AriaToggleButtonHTMLProps
>({
  name: "AriaToggleButton",
  compose: useButton,
  keys: [...INTERACTION_KEYS, "isSelected", "setSelected", "toggle"],

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const { isSelected, setSelected, toggle, ...restOptions } = options;
    const props = {
      ...restOptions,
      ...htmlProps,
    } as AriaToggleButtonOptionsTypes;
    const state = { isSelected, setSelected, toggle };
    const ref = React.useRef<HTMLElement>(null);

    const { buttonProps } = useToggleButton(props, state, ref);

    return mergeProps(
      {
        ...buttonProps,
        ref: useForkRef(ref, htmlRef),
      },
      htmlProps,
    );
  },
});

export const AriaToggleButton = createComponent({
  as: "button",
  memo: true,
  useHook: useAriaToggleButton,
});
