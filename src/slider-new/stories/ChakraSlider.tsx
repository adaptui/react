/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from "react";
import { VisuallyHidden } from "reakit";

import "./chakra.css";
import {
  useSliderState,
  SliderInitialState,
  SliderTrack,
  SliderThumb,
  SliderInput,
} from "../index";

interface ChakraSliderProps extends SliderInitialState {
  label?: string;
  isReversed?: boolean;
  onChange?: (values: number[]) => void;
}

export const ChakraSlider: React.FC<ChakraSliderProps> = props => {
  const { children, label, isReversed, onChange, ...rest } = props;
  const state = useSliderState({ reversed: isReversed, ...rest });
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;
  const isVertical = props.orientation === "vertical";

  React.useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

  return (
    <div className="chakra-styled" role="group" aria-labelledby="styled-slider">
      <div className="slider-label">
        <label className="label" id="styled-slider">
          {`${props.label ? props.label : "Styled"} Chakra Slider`}
        </label>
        <div className="value">{getThumbValueLabel(0)}</div>
      </div>
      <SliderTrack {...state} className={`slider ${isVertical && "vertical"}`}>
        <div className="slider-track" />
        <div
          className="slider-filled-track"
          style={{
            width: !isVertical && `${getValuePercent(values[0]) * 100}%`,
            height: isVertical && `${getValuePercent(values[0]) * 100}%`,
            left: !isReversed && !isVertical && "0px",
            right: isReversed && "0px",
          }}
        />
        <SliderThumb
          {...state}
          index={0}
          className="slider-thumb"
          style={{
            right: isReversed && `calc(${getThumbPercent(0) * 100}% - 7px)`,
            left:
              !isReversed &&
              !isVertical &&
              `calc(${getThumbPercent(0) * 100}% - 7px)`,
            bottom: isVertical && `calc(${getThumbPercent(0) * 100}% - 7px)`,
          }}
        >
          <VisuallyHidden>
            <SliderInput index={0} aria-labelledby="styled-slider" {...state} />
          </VisuallyHidden>
        </SliderThumb>
      </SliderTrack>
    </div>
  );
};
