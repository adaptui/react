import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useForkRef } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { SliderThumbState } from "./slider-thumb-state";

export const useSliderInput = createHook<SliderInputOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.inputRef, props.ref) };
    props = mergeProps(state.inputProps, props);

    return props;
  },
);

export const SliderInput = createComponent<SliderInputOptions>(props => {
  const htmlProps = useSliderInput(props);

  return createElement("input", htmlProps);
});

export type SliderInputOptions<T extends As = "input"> = Options<T> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: SliderThumbState;
};

export type SliderInputProps<T extends As = "input"> = Props<
  SliderInputOptions<T>
>;
