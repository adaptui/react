import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderTrack,
  SliderThumb,
  SliderInput,
  useSliderState,
  SliderInitialState,
} from "../../../index";

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
}

export const App: React.FC<AppProps> = args => {
  const { label, isReversed, ...rest } = args;

  const state = useSliderState({
    reversed: isReversed,
    ...rest,
  });
  const { values, getThumbValueLabel, getThumbPercent } = state;

  const isVertical = args.orientation === "vertical";

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
        <div className="value">{JSON.stringify(state.values)}</div>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...state} className="slider-track-container">
          <div className="slider-track" />
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
