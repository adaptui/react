import * as React from "react";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { SliderInput } from "./slider-input";
import { SliderThumbState } from "./slider-thumb-state";

export const useSliderThumb = createHook<SliderThumbOptions>(
  ({ state, ...props }) => {
    const children = <SliderInput state={state} />;

    props = { children, ...props };
    props = mergeProps(state.thumbProps, props);

    return props;
  },
);

export const SliderThumb = createComponent<SliderThumbOptions>(props => {
  const htmlProps = useSliderThumb(props);

  return createElement("div", htmlProps);
});

export type SliderThumbOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useSliderThumbState` hook.
   */
  state: SliderThumbState;
};

export type SliderThumbProps<T extends As = "div"> = Props<
  SliderThumbOptions<T>
>;
