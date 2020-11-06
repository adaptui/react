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
   * Orientation of the slider
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * True, if the direction of the slider is reversed
   * @default false
   */
  isReversed?: boolean;
  /**
   * Get the value when it changes
   */
  onChange?: (values: number[]) => void;
}

export const App: React.FC<AppProps> = args => {
  const { label, onChange, ...rest } = args;

  const state = useSliderState({ min: -10, max: +10, values: [0], ...rest });
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;
  const origin = 0;

  React.useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

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
        <div className="value">{getThumbValueLabel(0)}</div>
      </div>

      <div className="slider">
        <SliderTrack {...state} className="slider-track-container">
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
        <div
          className="slider-thumb"
          style={{ left: `calc(${getThumbPercent(0) * 100}% - 7px)` }}
        >
          <SliderThumb {...state} index={0} className="slider-thumb-handle">
            <VisuallyHidden>
              <SliderInput
                index={0}
                aria-label={`Thumb-${0}`}
                aria-labelledby="styled-slider"
                {...state}
              />
            </VisuallyHidden>
          </SliderThumb>
          {args.showTip && (
            <div className="slider-thumb-tip">{getThumbValueLabel(0)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
