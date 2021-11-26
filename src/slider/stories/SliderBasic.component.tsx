import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderGroup,
  SliderInitialState,
  SliderInput,
  SliderThumb,
  SliderThumbInitialState,
  SliderTrack,
  useSliderState,
  useSliderThumbState,
} from "../../index";

export type SliderBasicProps = SliderInitialState & {};

export const SliderBasic: React.FC<SliderBasicProps> = args => {
  const { label, ...rest } = args;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const slider = useSliderState({ ...rest, "aria-label": sliderLabel });
  const { getValuePercent, values } = slider.baseState;

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

        <Thumb index={0} sliderState={slider} aria-label="Thumb" />
      </div>
    </SliderGroup>
  );
};

export default SliderBasic;

export type SliderThumbProps = SliderThumbInitialState & {};

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, sliderState } = props;
  const { getThumbPercent, getThumbValueLabel } = sliderState.baseState;

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
