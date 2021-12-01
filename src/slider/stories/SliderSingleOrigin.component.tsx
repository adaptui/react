import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderBaseInitialState,
  SliderGroup,
  SliderInput,
  SliderLabel,
  SliderOutput,
  SliderThumb,
  SliderThumbInitialState,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "../../index";

interface SliderSingleOriginProps extends SliderBaseInitialState {
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
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider-label">
        <SliderLabel className="label" {...slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" {...slider}>
          {getThumbValueLabel(0)}
        </SliderOutput>
      </div>

      <div className="slider">
        <SliderTrack {...slider} className="slider-track-container">
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
    </SliderGroup>
  );
};

export default SliderSingleOrigin;

export type SliderThumbProps = SliderThumbInitialState &
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
      <SliderThumb {...sliderThumb} className="slider-thumb-handle">
        <VisuallyHidden>
          <SliderInput {...sliderThumb} />
        </VisuallyHidden>
      </SliderThumb>
      {showTip && (
        <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
      )}
    </div>
  );
};
