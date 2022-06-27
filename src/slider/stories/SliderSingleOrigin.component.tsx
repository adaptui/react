import * as React from "react";

import {
  Slider,
  SliderBaseStateProps,
  SliderLabel,
  SliderOutput,
  SliderThumb,
  SliderThumbStateProps,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "../../index";

import "./SliderBasic.css";

interface SliderSingleOriginProps extends SliderBaseStateProps {
  /**
   * True, if thumb needs a tip to show it's current percent
   */
  showTip?: boolean;
}

export const SliderSingleOrigin: React.FC<SliderSingleOriginProps> = props => {
  const { label, showTip, ...rest } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...rest, label: sliderLabel, state });
  const { getThumbValueLabel, getValuePercent, values } = state;

  const origin = 0;

  return (
    <Slider className="chakra-slider-group" state={slider}>
      <div className="slider-label">
        <SliderLabel className="label" state={slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" state={slider}>
          {getThumbValueLabel(0)}
        </SliderOutput>
      </div>

      <div className="slider">
        <SliderTrack state={slider} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{
              width: `${
                (getValuePercent(Math.max(values[0], origin)) -
                  getValuePercent(Math.min(values[0], origin))) *
                100
              }%`,
              left: `${getValuePercent(Math.min(values[0], origin)) * 100}%`,
            }}
          />
        </SliderTrack>

        <Thumb
          index={0}
          state={state}
          orientation={props.orientation}
          isDisabled={props.isDisabled}
          trackRef={slider.trackRef}
          showTip={showTip}
          aria-label="Thumb"
        />
      </div>
    </Slider>
  );
};

export default SliderSingleOrigin;

export type SliderThumbProps = SliderThumbStateProps &
  Pick<SliderSingleOriginProps, "showTip">;

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, showTip, state } = props;
  const { getThumbValueLabel, getThumbPercent } = state;

  return (
    <div
      className="slider-thumb"
      style={{ left: `calc(${getThumbPercent(index) * 100}% - 7px)` }}
    >
      <SliderThumb state={sliderThumb} className="slider-thumb-handle" />
      {showTip && (
        <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
      )}
    </div>
  );
};
