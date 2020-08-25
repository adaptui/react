import * as React from "react";
import { useForkRef } from "reakit-utils";
import { BoxHTMLProps, useBox } from "reakit";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";
import { AriaButtonProps } from "@react-types/button";
import { INTERACTION_KEYS } from "../interactions/__keys";
import { createComponent, createHook } from "reakit-system";

export const useAriaButton = createHook<AriaButtonProps, BoxHTMLProps>({
  name: "useAriaButton",
  keys: [...INTERACTION_KEYS],
  compose: [useBox],

  useProps(options, { ref: htmlRef, ...htmlProps }) {
    const props = { ...options, ...htmlProps } as AriaButtonProps;
    const ref = React.useRef<HTMLElement>(null);

    const { buttonProps } = useButton(props, ref);

    return mergeProps(htmlProps, {
      ...buttonProps,
      ref: useForkRef(ref, htmlRef),
    });
  },
});

export const AriaButton = createComponent({
  as: "button",
  memo: true,
  useHook: useAriaButton,
});
