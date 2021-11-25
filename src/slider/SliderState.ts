import * as React from "react";
import { useSlider } from "@react-aria/slider";
import { AriaSliderProps } from "@react-types/slider";

import {
  SliderBaseInitialState,
  SliderBaseStateReturn,
  useSliderBaseState,
} from "./index";

export type SliderState = {
  /**
   * Ref for the "track" element.  The width of this element provides the "length"
   * of the track -- the span of one dimensional space that the slider thumb can be.  It also
   * accepts click and drag motions, so that the closest thumb will follow clicks and drags on
   * the track..
   */
  trackRef: React.RefObject<HTMLElement>;

  /**
   * Sliders BaseState.
   */
  baseState: SliderBaseStateReturn;

  /**
   * The orientation of the Slider.
   * @default 'horizontal'
   */
  orientation: "horizontal" | "vertical";

  /** Props for the label element. */
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;

  /** Props for the root element of the slider component; groups slider inputs. */
  groupProps: React.HTMLAttributes<HTMLElement>;

  /** Props for the track element. */
  trackProps: React.HTMLAttributes<HTMLElement>;

  /** Props for the output element, displaying the value of the slider thumbs. */
  outputProps: React.OutputHTMLAttributes<HTMLOutputElement>;
};

export type SliderAction = {};

export type SliderInitialState = AriaSliderProps & SliderBaseInitialState & {};

export type SliderStateReturn = SliderState & SliderAction & {};

export function useSliderState(
  props: SliderInitialState = {},
): SliderStateReturn {
  const { orientation = "horizontal" } = props;
  const baseState = useSliderBaseState(props);
  const trackRef = React.useRef<HTMLElement>(null);
  const sliderProps = useSlider({ ...props, orientation }, baseState, trackRef);

  return {
    baseState,
    orientation,
    trackRef,
    ...sliderProps,
  };
}
