import * as React from "react";

import {
  Slider,
  SliderBaseStateProps,
  SliderLabel,
  SliderOutput,
  SliderThumb,
  SliderThumbStateProps,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "../../index";

import "./SliderBasic.css";

export type SliderMultiProps = SliderBaseStateProps & {
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
    <Slider className="chakra-slider-group" state={slider}>
      <div className="slider-label">
        <SliderLabel className="label" state={slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" state={slider}>
          {JSON.stringify(values)}
        </SliderOutput>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack state={slider} className="slider-track-container">
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
    </Slider>
  );
};

export default SliderMulti;

export type SliderThumbProps = SliderThumbStateProps &
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
      <SliderThumb state={sliderThumb} className="slider-thumb-handle" />
      {showTip && (
        <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
      )}
    </div>
  );
};
