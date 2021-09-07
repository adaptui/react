import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderTrack,
  SliderThumb,
  SliderInput,
  useSliderState,
  SliderInitialState,
} from "../../index";

interface SliderProps extends SliderInitialState {
  /**
   * Label for the slider
   *
   * @default Styled
   */
  label?: string;
  /**
   * True, if thumb needs a tip to show it's current percent
   */
  showTip?: boolean;
  /**
   * True, if the direction of the slider is reversed
   * @default false
   */
  isReversed?: boolean;
}

export const Slider: React.FC<SliderProps> = args => {
  const { label, isReversed, ...rest } = args;

  const state = useSliderState({
    reversed: isReversed,
    ...rest,
  });
  const { values, getThumbValueLabel, getThumbPercent } = state;

  const isVertical = args.orientation === "vertical";
  const isRange = values.length === 2;

  const labelValue = `${state.getThumbValueLabel(
    0,
  )} to ${state.getThumbValueLabel(1)}`;
  const trackWidth = `${
    (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100
  }%`;
  const trackLeft = `${getThumbPercent(0) * 100}%`;
  const trackRight = `${getThumbPercent(0) * 100}%`;

  return (
    <div
      className="chakra-slider-group"
      role="group"
      aria-labelledby="styled-slider"
    >
      <div className="slider-label">
        <label className="label" id="styled-slider">
          {`${args.label ? args.label : "Styled"} Slider`}
        </label>
        <div className="value">{labelValue}</div>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...state} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{
              width: !isVertical ? trackWidth : "",
              height: isVertical ? trackWidth : "",
              left: !isReversed && !isVertical && trackLeft ? trackLeft : "",
              right: isReversed ? trackRight : "",
              bottom:
                isVertical && isRange ? `${getThumbPercent(0) * 100}%` : "",
            }}
          />
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => {
          return (
            <div
              className="slider-thumb"
              key={`thumb-${index}`}
              style={{
                right: isReversed
                  ? `calc(${getThumbPercent(index) * 100}% - 7px)`
                  : "",
                left:
                  !isReversed && !isVertical
                    ? `calc(${getThumbPercent(index) * 100}% - 7px)`
                    : "",
                bottom: isVertical
                  ? `calc(${getThumbPercent(index) * 100}% - 7px)`
                  : "",
              }}
            >
              <SliderThumb
                {...state}
                index={index}
                className="slider-thumb-handle"
              >
                <VisuallyHidden>
                  <SliderInput
                    index={index}
                    aria-label={`Thumb-${index}`}
                    aria-labelledby="styled-slider"
                    {...state}
                  />
                </VisuallyHidden>
              </SliderThumb>
              {args.showTip && (
                <div className="slider-thumb-tip">
                  {getThumbValueLabel(index)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
