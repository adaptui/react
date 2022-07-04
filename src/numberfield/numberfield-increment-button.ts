import { useRef } from "react";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useForkRef } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";

import { NumberFieldState } from "./numberfield-state";

export const useNumberFieldIncrementButton =
  createHook<NumberFieldIncrementButtonOptions>(({ state, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(state.incrementButtonProps, ref);

    props = { ...props, ref: useForkRef(ref, props.ref) };
    props = mergeProps(buttonProps, props);

    return props;
  });

export const NumberFieldIncrementButton =
  createComponent<NumberFieldIncrementButtonOptions>(props => {
    const htmlProps = useNumberFieldIncrementButton(props);

    return createElement("button", htmlProps);
  });

export type NumberFieldIncrementButtonOptions<T extends As = "button"> =
  Options<T> & {
    /**
     * Object returned by the `useNumberFieldState` hook.
     */
    state: NumberFieldState;
  };

export type NumberFieldIncrementButtonProps<T extends As = "button"> = Props<
  NumberFieldIncrementButtonOptions<T>
>;
