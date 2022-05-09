import { mergeProps } from "@react-aria/utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { SliderState } from "./slider-state";

export const useSliderOutput = createHook<SliderOutputOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.outputProps, props);
    return props;
  },
);

export const SliderOutput = createComponent<SliderOutputOptions>(props => {
  const htmlProps = useSliderOutput(props);

  return createElement("output", htmlProps);
});

export type SliderOutputOptions<T extends As = "output"> = Options<T> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: SliderState;
};

export type SliderOutputProps<T extends As = "output"> = Props<
  SliderOutputOptions<T>
>;
