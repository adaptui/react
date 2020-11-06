import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderTrack,
  SliderThumb,
  SliderInput,
  useSliderState,
  SliderInitialState,
} from "renderless-components";

interface AppProps extends SliderInitialState {
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
  /**
   * Origin on the slider, calculated based on min & max
   */
  origin?: number;
}

export const App: React.FC<AppProps> = args => {
  const { label, isReversed, origin: originProp, ...rest } = args;
  const origin = originProp ?? args.min ?? 0;

  const state = useSliderState({ reversed: isReversed, ...rest });
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;

  const isVertical = args.orientation === "vertical";
  const isRange = values.length === 2;
  const isMulti = values.length > 2;

  const labelValue = !isRange
    ? getThumbValueLabel(0)
    : `${state.getThumbValueLabel(0)} to ${state.getThumbValueLabel(1)}`;
  const trackWidth = !isRange
    ? `${
        (getValuePercent(Math.max(values[0], origin)) -
          getValuePercent(Math.min(values[0], origin))) *
        100
      }%`
    : `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`;
  const trackLeft = !isRange
    ? `${getValuePercent(Math.min(values[0], origin)) * 100}%`
    : `${getThumbPercent(0) * 100}%`;
  const trackRight = !isRange ? "0px" : `${getThumbPercent(0) * 100}%`;

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
        <div className="value">
          {!isMulti ? labelValue : JSON.stringify(state.values)}
        </div>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...state} className="slider-track-container">
          <div className="slider-track" />
          {!isMulti ? (
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
          ) : null}
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

export default App;
