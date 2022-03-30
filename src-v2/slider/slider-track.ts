import { mergeProps } from "@react-aria/utils";
import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { SliderState } from "./slider-state";

export const useSliderTrack = createHook<SliderTrackOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.trackRef, props.ref) };
    props = mergeProps(state.trackProps, props);

    return props;
  },
);

export const SliderTrack = createComponent<SliderTrackOptions>(props => {
  const htmlProps = useSliderTrack(props);

  return createElement("div", htmlProps);
});

export type SliderTrackOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useSliderState` hook.
   */
  state: SliderState;
};

export type SliderTrackProps<T extends As = "div"> = Props<
  SliderTrackOptions<T>
>;
