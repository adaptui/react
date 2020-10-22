import * as React from "react";

import "./index.css";
import {
  useSliderState,
  SliderInitialState,
  SliderTrack,
  SliderThumb,
  SliderInput,
  SliderStateReturn,
} from "../index";

import { VisuallyHidden } from "reakit";
import { cx } from "../../utils";

interface MultiSliderProps extends SliderInitialState {
  label?: string;
}

export const MultiSlider: React.FC<MultiSliderProps> = props => {
  const { children, ...rest } = props;
  const state = useSliderState(rest);

  const numThumbs = React.Children.count(children);
  if (numThumbs !== state.values.length) {
    throw new Error(
      "You must have the same number of MultiSliderThumb as the number of values in `defaultValue` or `value`.",
    );
  }

  return (
    <div className="slider" role="group" aria-labelledby="a11y-slider">
      <div className="sliderLabel">
        {props.label && (
          <label className="label" id="a11y-slider">
            {props.label}
          </label>
        )}
        <div className="value">{JSON.stringify(state.values)}</div>
      </div>

      {
        // We make rail and all thumbs children of the trackRef.  That means dragging on the thumb
        // will also trigger the dragging handlers on the track, so we need to make sure we don't
        // double-handle these events.
      }
      <SliderTrack className="track" {...state}>
        <div className="rail" />
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as React.ReactElement, {
            state,
            index,
          }),
        )}
      </SliderTrack>
    </div>
  );
};

interface MultiSliderThumbProps {
  state?: SliderStateReturn;
  index?: number;
  label: string;
}

export function MultiSliderThumb(props: MultiSliderThumbProps) {
  console.log("%c props", "color: #99adcc", props);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { index, state, label } = props;

  return (
    <SliderThumb
      {...state}
      index={index}
      inputRef={inputRef}
      className={cx("thumb", "thumbHandle")}
      style={{
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <VisuallyHidden>
        <SliderInput
          ref={inputRef}
          index={index}
          aria-label={label}
          aria-labelledby="a11y-slider"
          {...state}
        />
      </VisuallyHidden>
    </SliderThumb>
  );
}
