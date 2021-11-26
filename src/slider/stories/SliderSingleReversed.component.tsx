import * as React from "react";
import { VisuallyHidden } from "reakit";
import { I18nProvider } from "@react-aria/i18n";

import {
  SliderGroup,
  SliderInitialState,
  SliderInput,
  SliderLabel,
  SliderOutput,
  SliderThumb,
  SliderThumbInitialState,
  SliderTrack,
  useSliderState,
  useSliderThumbState,
} from "../../index";

export type SliderSingleReversedProps = SliderInitialState & {
  /**
   * Label for the slider
   *
   * @default Styled
   */
  label?: string;

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

export const Slider: React.FC<SliderSingleReversedProps> = args => {
  const { label, showTip, ...rest } = args;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const slider = useSliderState({ ...rest, label: sliderLabel });
  const { getThumbValue, getValuePercent, values } = slider.baseState;

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
          sliderState={slider}
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
  const { index, showTip, sliderState } = props;
  const { getThumbValueLabel, getThumbPercent } = sliderState.baseState;

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
