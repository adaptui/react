import * as React from "react";
import { useSliderThumb } from "@react-aria/slider";
import { AriaSliderThumbProps } from "@react-types/slider";

import { SliderStateReturn } from "./SliderState";
import {} from ".";

export type SliderThumbState = {
  /**
   * Slider state, created via `useSliderState`.
   */
  sliderState: SliderStateReturn;

  /** A ref to the thumb input element. */
  inputRef: React.RefObject<HTMLInputElement>;

  /** Props for the root thumb element; handles the dragging motion. */
  thumbProps: React.HTMLAttributes<HTMLElement>;

  /** Props for the visually hidden range input element. */
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;

  /** Props for the label element for this thumb (optional). */
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
};

export type SliderThumbActions = {};

export type SliderThumbInitialState = Pick<SliderThumbState, "sliderState"> &
  AriaSliderThumbProps & {};

export type SliderThumbStateReturn = SliderThumbState & SliderThumbActions;

export function useSliderThumbState(
  props: SliderThumbInitialState,
): SliderThumbStateReturn {
  const { sliderState, ...restProps } = props;
  const { trackRef, baseState, orientation } = sliderState;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sliderThumbProps = useSliderThumb(
    {
      trackRef,
      inputRef,
      isDisabled: baseState.isDisabled,
      orientation,
      ...restProps,
    },
    baseState,
  );

  return {
    sliderState,
    inputRef,
    ...sliderThumbProps,
  };
}
