import * as React from "react";
import { VisuallyHidden } from "reakit";
import { I18nProvider } from "@react-aria/i18n";

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

export type SliderSingleReversedProps = SliderBaseInitialState & {
  /**
   * True, if thumb needs a tip to show it's current percent
   */
  showTip?: boolean;
};

export const SliderSingleReversed: React.FC<
  SliderSingleReversedProps
> = args => {
  return (
    <I18nProvider locale="ar-ae">
      <Slider {...args} />
    </I18nProvider>
  );
};

export default SliderSingleReversed;

export const Slider: React.FC<SliderSingleReversedProps> = props => {
  const { label, showTip, ...rest } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...rest, label: sliderLabel, state });
  const { getThumbValue, getValuePercent, values } = state;

  return (
    <SliderGroup className="chakra-slider-group" {...slider}>
      <div className="slider-label">
        <SliderLabel className="label" {...slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" {...slider}>
          {getThumbValue(0)}
        </SliderOutput>
      </div>

      <div className="slider">
        <SliderTrack {...slider} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{
              width: `${getValuePercent(values[0]) * 100}%`,
              right: "0px",
            }}
          />
        </SliderTrack>

        <Thumb
          index={0}
          state={state}
          orientation={props.orientation}
          isDisabled={props.isDisabled}
          trackRef={slider.trackRef}
          aria-label="Thumb"
          showTip={showTip}
        />
      </div>
    </SliderGroup>
  );
};

export type SliderThumbProps = SliderThumbInitialState &
  Pick<SliderSingleReversedProps, "showTip">;

export const Thumb: React.FC<SliderThumbProps> = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index, showTip, state } = props;
  const { getThumbValueLabel, getThumbPercent } = state;

  return (
    <div
      className="slider-thumb"
      style={{ right: `calc(${getThumbPercent(index) * 100}% - 7px)` }}
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
