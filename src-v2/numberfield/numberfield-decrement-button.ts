import { useRef } from "react";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";
import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { NumberFieldState } from "./numberfield-state";

export const useNumberFieldDecrementButton =
  createHook<NumberFieldDecrementButtonOptions>(({ state, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(state.decrementButtonProps, ref);

    props = { ...props, ref: useForkRef(ref, props.ref) };
    props = mergeProps(buttonProps, props);

    return props;
  });

export const NumberFieldDecrementButton =
  createComponent<NumberFieldDecrementButtonOptions>(props => {
    const htmlProps = useNumberFieldDecrementButton(props);

    return createElement("button", htmlProps);
  });

export type NumberFieldDecrementButtonOptions<T extends As = "button"> =
  Options<T> & {
    /**
     * Object returned by the `useNumberFieldState` hook.
     */
    state: NumberFieldState;
  };

export type NumberFieldDecrementButtonProps<T extends As = "button"> = Props<
  NumberFieldDecrementButtonOptions<T>
>;
