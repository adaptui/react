import * as React from "react";
import { values } from "lodash";

import { SliderInitialState, SliderTrack, useSliderState } from "../../index";
import state from "../../tooltip/__globalState";
import { SliderGroup } from "../SliderGroup";
import { SliderLabel } from "../SliderLabel";
import { SliderOutput } from "../SliderOutput";

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
  const { label, ...rest } = args;

  const slider = useSliderState(rest);
  const { getThumbValueLabel, getValuePercent } = slider.baseState;

  return (
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider-label">
        <SliderLabel className="label" {...slider}>
          {`${args.label ? args.label : "Styled"} Slider`}
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
            style={{ width: `${getValuePercent(values[0]) * 100}%` }}
          />
        </SliderTrack>
        {/* <div
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
        </div> */}
      </div>
    </SliderGroup>
  );
};

export default Slider;
