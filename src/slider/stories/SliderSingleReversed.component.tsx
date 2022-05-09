import * as React from "react";
import { I18nProvider } from "@react-aria/i18n";

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

export type SliderSingleReversedProps = SliderBaseStateProps & {
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
      <SliderSingleReversedComp {...args} />
    </I18nProvider>
  );
};

export default SliderSingleReversed;

export const SliderSingleReversedComp: React.FC<
  SliderSingleReversedProps
> = props => {
  const { label, showTip, ...rest } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...rest, label: sliderLabel, state });
  const { getThumbValue, getValuePercent, values } = state;

  return (
    <Slider className="chakra-slider-group" state={slider}>
      <div className="slider-label">
        <SliderLabel className="label" state={slider}>
          {sliderLabel}
        </SliderLabel>
        <SliderOutput className="value" state={slider}>
          {getThumbValue(0)}
        </SliderOutput>
      </div>

      <div className="slider">
        <SliderTrack state={slider} className="slider-track-container">
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
    </Slider>
  );
};

export type SliderThumbProps = SliderThumbStateProps &
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
      <SliderThumb state={sliderThumb} className="slider-thumb-handle" />
      {showTip && (
        <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
      )}
    </div>
  );
};
