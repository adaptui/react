import * as React from "react";

import "./index.css";
import {
  useSliderState,
  SliderInitialState,
  SliderTrack,
  SliderThumb,
  SliderInput,
} from "../index";

import { VisuallyHidden } from "reakit";

interface StorySliderProps extends SliderInitialState {
  origin?: number;
  showTip?: boolean;
}

export const StorySlider: React.FC<StorySliderProps> = props => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { children, origin: OriginProp, showTip, ...rest } = props;
  const origin = OriginProp ?? props.min ?? 0;
  const state = useSliderState(rest);
  console.log("%c state", "color: #364cd9", state);

  const value = state.values[0];
  console.log("%c value", "color: #ffa280", value);

  return (
    <div className="slider" role="group">
      {/* <div className="sliderLabel">
        {props.label && (
          <label {...labelProps} className="label">
            {props.label}
          </label>
        )}
        <div className="value">{state.getThumbValueLabel(0)}</div>
      </div> */}
      <div className="trackContainer">
        {
          // We make rail, filledRail, and track siblings in the DOM, so that trackRef has no children.
          // User must click on the trackRef to drag by track, and so it comes last in the DOM.
        }
        <div className="rail" />
        <div
          className="filledRail"
          style={{
            left: `${state.getValuePercent(Math.min(value, origin)) * 100}%`,
            width: `${
              (state.getValuePercent(Math.max(value, origin)) -
                state.getValuePercent(Math.min(value, origin))) *
              100
            }%`,
          }}
        />
        <SliderTrack {...state} ref={trackRef} className="track" />

        <div
          className="thumb"
          style={{
            left: `${state.getThumbPercent(0) * 100}%`,
          }}
        >
          {/* We put thumbProps on thumbHandle, so that you cannot drag by the tip */}
          <SliderThumb {...state} className="thumbHandle">
            <VisuallyHidden>
              <SliderInput className="input" ref={inputRef} {...state} />
            </VisuallyHidden>
          </SliderThumb>
          {props.showTip && <div className="tip">{value}</div>}
        </div>
      </div>
    </div>
  );
};
