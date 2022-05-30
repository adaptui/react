import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { SliderState } from "./slider-state";

export const useSlider = createHook<SliderOptions>(({ state, ...props }) => {
  props = mergeProps(state.groupProps, props);

  return props;
});

export const Slider = createComponent<SliderOptions>(props => {
  const htmlProps = useSlider(props);

  return createElement("div", htmlProps);
});

export type SliderOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: SliderState;
};

export type SliderProps<T extends As = "div"> = Props<SliderOptions<T>>;
