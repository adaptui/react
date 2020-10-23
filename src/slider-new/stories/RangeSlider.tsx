import * as React from "react";
import { VisuallyHidden } from "reakit";

import "./index.css";
import {
  useSliderState,
  SliderInitialState,
  SliderTrack,
  SliderThumb,
  SliderInput,
} from "../index";

interface RangeSliderProps extends SliderInitialState {
  showTip?: boolean;
  label?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = props => {
  const { children, showTip, ...rest } = props;
  const state = useSliderState(rest);

  if (state.values.length !== 2) {
    throw new Error("Must specify an array of two numbers");
  }

  const inputRef1 = React.useRef<HTMLInputElement>(null);
  const inputRef2 = React.useRef<HTMLInputElement>(null);

  return (
    <div className="slider" role="group" aria-labelledby="a11y-slider">
      <div className="sliderLabel">
        {props.label && (
          <label className="label" id="a11y-slider">
            {props.label}
          </label>
        )}
        <div className="value">
          {state.getThumbValueLabel(0)}
          {" to "}
          {state.getThumbValueLabel(1)}
        </div>
      </div>

      <div className="trackContainer">
        {
          // We make rail and filledRail children of track. User can click on the track, the
          // rail, or the filledRail to drag by track
        }
        <SliderTrack className="track" {...state}>
          <div className="rail" />
          <div
            className="filledRail"
            style={{
              left: `${state.getThumbPercent(0) * 100}%`,
              width: `${
                (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100
              }%`,
            }}
          />
        </SliderTrack>

        <div
          className="thumb"
          style={{
            left: `${state.getThumbPercent(0) * 100}%`,
          }}
        >
          {/* We put thumbProps on thumbHandle, so that you cannot drag by the tip */}
          <SliderThumb
            {...state}
            index={0}
            inputRef={inputRef1}
            className="thumbHandle"
          >
            <VisuallyHidden>
              <SliderInput
                ref={inputRef1}
                index={0}
                arai-label="minimum"
                aria-labelledby="a11y-slider"
                {...state}
              />
            </VisuallyHidden>
          </SliderThumb>
          {props.showTip && (
            <div className="tip">{state.getThumbValueLabel(0)}</div>
          )}
        </div>

        <SliderThumb
          {...state}
          index={1}
          inputRef={inputRef2}
          className="thumb"
          style={{
            left: `${state.getThumbPercent(1) * 100}%`,
          }}
        >
          {
            // For fun, we put the thumbProps on the thumb container instead of just the handle.
            // This means you can drag the max thumb by the tip.
          }
          <div className="thumbHandle">
            <VisuallyHidden>
              <SliderInput
                ref={inputRef2}
                index={1}
                arai-label="maximum"
                aria-labelledby="a11y-slider"
                {...state}
              />
            </VisuallyHidden>
          </div>
          {props.showTip && (
            <div className="tip">
              {state.getThumbValueLabel(1)} (can drag by tip)
            </div>
          )}
        </SliderThumb>
      </div>
    </div>
  );
};
