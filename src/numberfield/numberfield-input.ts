import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { NumberFieldState } from "./numberfield-state";

export const useNumberFieldInput = createHook<NumberFieldInputOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.inputRef, props.ref) };
    props = mergeProps(state.inputProps, props);

    return props;
  },
);

export const NumberFieldInput = createComponent<NumberFieldInputOptions>(
  props => {
    const htmlProps = useNumberFieldInput(props);

    return createElement("input", htmlProps);
  },
);

export type NumberFieldInputOptions<T extends As = "input"> = Options<T> & {
  /**
   * Object returned by the `useNumberFieldState` hook.
   */
  state: NumberFieldState;
};

export type NumberFieldInputProps<T extends As = "input"> = Props<
  NumberFieldInputOptions<T>
>;
