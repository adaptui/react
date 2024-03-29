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

export type SliderAllInOneProps = SliderBaseStateProps & {
  /**
   * Origin on the slider, calculated based on min & max
   */
  origin?: number;

  /**
   * True, if thumb needs a tip to show it's current percent
   */
  showTip?: boolean;
};

export const SliderAllInOne: React.FC<SliderAllInOneProps> = props => {
  const { label, origin: originProp, showTip, ...rest } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const origin = originProp ?? props.minValue ?? 0;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...rest, label: sliderLabel, state });
  const { getThumbValueLabel, getThumbPercent, getValuePercent, values } =
    state;

  const isVertical = props.orientation === "vertical";
  const isRange = values.length === 2;
  const isMulti = values.length > 2;

  const labelValue = !isRange
    ? getThumbValueLabel(0)
    : `${getThumbValueLabel(0)} to ${getThumbValueLabel(1)}`;
  const trackWidth = !isRange
    ? `${
        (getValuePercent(Math.max(values[0], origin)) -
          getValuePercent(Math.min(values[0], origin))) *
        100
      }%`
    : `${(getThumbPercent(1) - getThumbPercent(0)) * 100}%`;
  const trackLeft = !isRange
    ? `${getValuePercent(Math.min(values[0], origin)) * 100}%`
    : `${getThumbPercent(0) * 100}%`;

  return (
    <Slider className="chakra-slider-group" state={slider}>
      <div className="slider-label">
        <SliderLabel className="label" state={slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" state={slider}>
          {!isMulti ? labelValue : JSON.stringify(values)}
        </SliderOutput>
      </div>

      <div className={`slider ${isVertical ? "vertical" : ""}`}>
        <SliderTrack state={slider} className="slider-track-container">
          <div className="slider-track" />
          {!isMulti ? (
            <div
              className="slider-filled-track"
              style={{
                width: !isVertical ? trackWidth : "",
                height: isVertical ? trackWidth : "",
                left: !isVertical && trackLeft ? trackLeft : "",
                bottom:
                  isVertical && isRange ? `${getThumbPercent(0) * 100}%` : "",
              }}
            />
          ) : null}
        </SliderTrack>

        {[...new Array(values.length).keys()].map(index => (
          <Thumb
            index={index}
            key={`thumb-${index}`}
            aria-label={`Thumb-${index}`}
            state={state}
            orientation={props.orientation}
            isDisabled={props.isDisabled}
            trackRef={slider.trackRef}
            showTip={showTip}
          />
        ))}
      </div>
    </Slider>
  );
};

export default SliderAllInOne;

export type SliderThumbProps = SliderThumbStateProps &
  Pick<SliderAllInOneProps, "showTip">;

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, orientation, showTip } = props;
  const { getThumbPercent, getThumbValueLabel } = props.state;

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
