import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  useSliderState,
  SliderTrack,
  SliderThumb,
  SliderInput,
} from "renderless-components";

interface AppProps {
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
   * The `value` of the slider indicator.
   *
   * If `undefined`/`not valid` the slider bar will be the optimum of min & max
   * @default [0]
   */
  values?: number[];
  /**
   * The minimum value of the slider
   * @default -10
   */
  min?: number;
  /**
   * The maximum value of the slider
   * @default +10
   */
  max?: number;
  /**
   * The step in which increments/decrements have to be made
   * @default 1
   */
  step?: number;
  /**
   * If `true`, the slider will be disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Get the formated value based on number format options
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * Get the value when it changes
   */
  onChange?: (values: number[]) => void;
  /**
   * Get the value when dragging is started
   */
  onChangeEnd?: (value: number[]) => void;
  /**
   * Get the value when dragging is stopped
   */
  onChangeStart?: (value: number[]) => void;
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
