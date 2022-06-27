import * as React from "react";

import {
  Slider,
  SliderBaseStateProps,
  SliderThumb,
  SliderThumbStateProps,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "../../index";

import "./SliderBasic.css";

export type SliderBasicProps = SliderBaseStateProps & {};

export const SliderBasic: React.FC<SliderBasicProps> = props => {
  const { label } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...props, "aria-label": sliderLabel, state });
  const { getValuePercent, values } = state;

  return (
    <Slider className="chakra-slider-group" state={slider}>
      <div className="slider">
        <SliderTrack state={slider} className="slider-track-container">
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
    </Slider>
  );
};

export default SliderBasic;

export type SliderThumbProps = SliderThumbStateProps & {};

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index } = props;
  const { getThumbPercent, getThumbValueLabel } = props.state;

  return (
    <div
      className="slider-thumb"
      style={{ left: `calc(${getThumbPercent(index) * 100}% - 7px)` }}
    >
      <SliderThumb state={sliderThumb} className="slider-thumb-handle" />
      <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
    </div>
  );
};
