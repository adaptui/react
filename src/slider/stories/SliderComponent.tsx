/* eslint-disable jsx-a11y/label-has-associated-control */
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

interface ChakraSliderProps extends SliderInitialState {
  label?: string;
  isReversed?: boolean;
  showTip?: boolean;
  origin?: number;
  onChange?: (values: number[]) => void;
}

export const ChakraSlider: React.FC<ChakraSliderProps> = props => {
  const {
    children,
    label,
    showTip,
    isReversed,
    origin: originProp,
    onChange,
    ...rest
  } = props;
  const origin = originProp ?? props.min ?? 0;

  const state = useSliderState({ reversed: isReversed, ...rest });
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;

  const isVertical = props.orientation === "vertical";
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
          {`${props.label ? props.label : "Styled"} Slider`}
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
                width: !isVertical && trackWidth,
                height: isVertical && trackWidth,
                left: !isReversed && !isVertical && trackLeft,
                right: isReversed && "0px",
              }}
            />
          ) : null}
        </SliderTrack>

        {[...new Array(values.length).keys()].map(i => (
          <Thumb
            keys={`thumb-${i}`}
            index={i}
            state={state}
            isReversed={isReversed}
            isVertical={isVertical}
            showTip={showTip}
          />
        ))}
      </div>
    </div>
  );
};

const Thumb = props => {
  const { state, isReversed, isVertical, showTip, index } = props;
  const { getThumbValueLabel, getThumbPercent } = state;

  return (
    <div
      className="slider-thumb"
      style={{
        right: isReversed && `calc(${getThumbPercent(index) * 100}% - 7px)`,
        left:
          !isReversed &&
          !isVertical &&
          `calc(${getThumbPercent(index) * 100}% - 7px)`,
        bottom: isVertical && `calc(${getThumbPercent(index) * 100}% - 7px)`,
      }}
    >
      <SliderThumb {...state} index={index} className="slider-thumb-handle">
        <VisuallyHidden>
          <SliderInput
            index={index}
            aria-label={`Thumb-${index}`}
            aria-labelledby="styled-slider"
            {...state}
          />
        </VisuallyHidden>
      </SliderThumb>
      {showTip && (
        <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
      )}
    </div>
  );
};
