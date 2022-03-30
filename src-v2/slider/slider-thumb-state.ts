import * as React from "react";
import { useSliderThumb } from "@react-aria/slider";
import { AriaSliderThumbProps } from "@react-types/slider";

import { SliderBaseState } from "./slider-base-state";

export function useSliderThumbState(
  props: SliderThumbStateProps,
): SliderThumbState {
  const { state, trackRef, ...thumbProps } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sliderThumbProps = useSliderThumb(
    {
      inputRef,
      trackRef,
      ...thumbProps,
    },
    state,
  );

  return { ...sliderThumbProps, inputRef };
}

export type SliderThumbState = {
  /** A ref to the thumb input element. */
  inputRef: React.RefObject<HTMLInputElement>;

  /** Props for the root thumb element; handles the dragging motion. */
  thumbProps: React.HTMLAttributes<HTMLElement>;

  /** Props for the visually hidden range input element. */
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;

  /** Props for the label element for this thumb (optional). */
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
};

export type SliderThumbStateProps = AriaSliderThumbProps & {
  /** A ref to the track element. */
  trackRef: React.RefObject<HTMLElement>;

  state: SliderBaseState;
};
