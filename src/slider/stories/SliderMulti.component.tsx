import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderBaseInitialState,
  SliderGroup,
  SliderInput,
  SliderLabel,
  SliderOutput,
  SliderThumb,
  SliderThumbInitialState,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "../../index";

export type SliderMultiProps = SliderBaseInitialState & {
  /**
   * True, if thumb needs a tip to show it's current percent
   */
  showTip?: boolean;
};

export const SliderMulti: React.FC<SliderMultiProps> = props => {
  const { label, showTip, ...rest } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...rest, label: sliderLabel, state });
  const { values } = state;

  const isVertical = props.orientation === "vertical";

  return (
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider-label">
        <SliderLabel className="label" {...slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" {...slider}>
          {JSON.stringify(values)}
        </SliderOutput>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack {...slider} className="slider-track-container">
          <div className="slider-track" />
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => (
          <Thumb
            index={index}
            key={`thumb-${index}`}
            aria-label={`Thumb-${index}`}
            orientation={props.orientation}
            isDisabled={props.isDisabled}
            trackRef={slider.trackRef}
            state={state}
            showTip={showTip}
          />
        ))}
      </div>
    </SliderGroup>
  );
};

export default SliderMulti;

export type SliderThumbProps = SliderThumbInitialState &
  Pick<SliderMultiProps, "showTip">;

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, showTip, state, orientation } = props;
  const { getThumbValueLabel, getThumbPercent } = state;

  const isVertical = orientation === "vertical";

  return (
    <div
      className="slider-thumb"
      style={{
        left: !isVertical ? `calc(${getThumbPercent(index) * 100}% - 7px)` : "",
        bottom: isVertical
          ? `calc(${getThumbPercent(index) * 100}% - 7px)`
          : "",
      }}
    >
      <SliderThumb {...sliderThumb} className="slider-thumb-handle">
        <VisuallyHidden>
          <SliderInput {...sliderThumb} />
        </VisuallyHidden>
      </SliderThumb>
      {showTip && (
        <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
      )}
    </div>
  );
};
