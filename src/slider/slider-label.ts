import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { SliderState } from "./slider-state";

export const useSliderLabel = createHook<SliderLabelOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.labelProps, props);
    return props;
  },
);

export const SliderLabel = createComponent<SliderLabelOptions>(props => {
  const htmlProps = useSliderLabel(props);

  return createElement("label", htmlProps);
});

export type SliderLabelOptions<T extends As = "label"> = Options<T> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: SliderState;
};

export type SliderLabelProps<T extends As = "label"> = Props<
  SliderLabelOptions<T>
>;
