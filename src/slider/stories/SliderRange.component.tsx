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

export type SliderRangeProps = SliderBaseInitialState & {
  /**
   * True, if thumb needs a tip to show it's current percent
   */
  showTip?: boolean;
};

export const SliderRange: React.FC<SliderRangeProps> = props => {
  const { label, showTip, ...rest } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...rest, label: sliderLabel, state });
  const { getThumbValueLabel, getThumbPercent, values } = state;

  const isVertical = props.orientation === "vertical";
  const isRange = values.length === 2;

  const labelValue = `${getThumbValueLabel(0)} to ${getThumbValueLabel(1)}`;
  const trackWidth = `${(getThumbPercent(1) - getThumbPercent(0)) * 100}%`;
  const trackLeft = `${getThumbPercent(0) * 100}%`;

  return (
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider-label">
        <SliderLabel className="label" {...slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" {...slider}>
          {labelValue}
        </SliderOutput>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...slider} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{
              width: !isVertical ? trackWidth : "",
              height: isVertical ? trackWidth : "",
              left: !isVertical && trackLeft ? trackLeft : "",
              bottom:
                isVertical && isRange ? `${getThumbPercent(0) * 100}%` : "",
            }}
          />
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => (
          <Thumb
            index={index}
            key={`thumb-${index}`}
            aria-label={`Thumb-${index}`}
            state={state}
            orientation={props.orientation}
            isDisabled={props.isDisabled}
            trackRef={slider.trackRef}
            showTip={showTip}
          />
        ))}
      </div>
    </SliderGroup>
  );
};

export default SliderRange;

export type SliderThumbProps = SliderThumbInitialState &
  Pick<SliderRangeProps, "showTip">;

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, showTip, state, orientation } = props;
  const { getThumbValueLabel, getThumbPercent } = state;

  const isVertical = orientation === "vertical";

  return (
    <div
      className="slider-thumb"
      style={{
        left: !isVertical ? `calc(${getThumbPercent(index) * 100}% - 7px)` : "",
        bottom: isVertical
          ? `calc(${getThumbPercent(index) * 100}% - 7px)`
          : "",
      }}
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
