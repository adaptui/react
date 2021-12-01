import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderBaseInitialState,
  SliderGroup,
  SliderInput,
  SliderThumb,
  SliderThumbInitialState,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "../../index";

export type SliderBasicProps = SliderBaseInitialState & {};

export const SliderBasic: React.FC<SliderBasicProps> = props => {
  const { label } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...props, "aria-label": sliderLabel, state });
  const { getValuePercent, values } = state;

  return (
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider">
        <SliderTrack {...slider} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{ width: `${getValuePercent(values[0]) * 100}%` }}
          />
        </SliderTrack>

        <Thumb
          index={0}
          state={state}
          orientation={props.orientation}
          isDisabled={props.isDisabled}
          trackRef={slider.trackRef}
          aria-label="Thumb"
        />
      </div>
    </SliderGroup>
  );
};

export default SliderBasic;

export type SliderThumbProps = SliderThumbInitialState & {};

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index } = props;
  const { getThumbPercent, getThumbValueLabel } = props.state;

  return (
    <div
      className="slider-thumb"
      style={{ left: `calc(${getThumbPercent(index) * 100}% - 7px)` }}
    >
      <SliderThumb {...sliderThumb} className="slider-thumb-handle">
        <VisuallyHidden>
          <SliderInput {...sliderThumb} />
        </VisuallyHidden>
      </SliderThumb>
      <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
    </div>
  );
};
