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

interface BasicSliderProps extends SliderInitialState {
  origin?: number;
  showTip?: boolean;
  label?: string;
}

export const BasicSlider: React.FC<BasicSliderProps> = props => {
  const { children, origin: OriginProp, showTip, ...rest } = props;
  const origin = OriginProp ?? props.min ?? 0;
  const state = useSliderState(rest);

  const value = state.values[0];

  return (
    <div className="slider" role="group" aria-labelledby="a11y-slider">
      <div className="sliderLabel">
        {props.label && (
          <label className="label" id="a11y-slider">
            {props.label}
          </label>
        )}
        <div className="value">{state.getThumbValueLabel(0)}</div>
      </div>
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

        <SliderTrack {...state} className="track" />
        <div
          className="thumb"
          style={{
            left: `${state.getThumbPercent(0) * 100}%`,
          }}
        >
          {/* We put thumbProps on thumbHandle, so that you cannot drag by the tip */}
          <SliderThumb {...state} index={0} className="thumbHandle">
            <VisuallyHidden>
              <SliderInput index={0} aria-labelledby="a11y-slider" {...state} />
            </VisuallyHidden>
          </SliderThumb>
          {props.showTip && (
            <div className="tip">{state.getThumbValueLabel(0)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
