import * as React from "react";
import { useForkRef } from "reakit-utils";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";
import { createComponent, createHook } from "reakit-system";
import {
  ButtonHTMLProps,
  ButtonOptions,
  useButton as useReakitButton,
} from "reakit";
import { AriaButtonProps as AriaButtonOptionsTypes } from "@react-types/button";

import { INTERACTION_KEYS } from "../interactions/__keys";

export type AriaButtonOptions = ButtonOptions & AriaButtonOptionsTypes;

export type AriaButtonHTMLProps = ButtonHTMLProps;

export type AriaButtonProps = AriaButtonOptions & AriaButtonHTMLProps;

export const useAriaButton = createHook<AriaButtonOptions, AriaButtonHTMLProps>(
  {
    name: "AriaButton",
    compose: useReakitButton,
    keys: INTERACTION_KEYS,

    useProps(options, { ref: htmlRef, ...htmlProps }) {
      const props = { ...options, ...htmlProps } as AriaButtonOptionsTypes;
      const ref = React.useRef<HTMLElement>(null);

      const { buttonProps } = useButton(props, ref);

      return mergeProps(
        {
          ...buttonProps,
          ref: useForkRef(ref, htmlRef),
        },
        htmlProps,
      );
    },
  },
);

export const AriaButton = createComponent({
  as: "button",
  memo: true,
  useHook: useAriaButton,
});
