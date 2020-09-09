import React from "react";
import { Meta } from "@storybook/react";

import {
  Slider,
  SliderTrack,
  SliderInput,
  SliderThumb,
  useSliderState,
  SliderFilledTrack,
} from "..";
import {
  sliderHorizontalFilledTractStyle,
  sliderHorizontalStyle,
  sliderHorizontalThumbStyle,
  sliderHorizontalTrackStyle,
  sliderVerticalFilledTractStyle,
  sliderVerticalStyle,
  sliderVerticalThumbStyle,
  sliderVerticalTrackStyle,
} from "./styles";

export default {
  title: "Component/Slider",
} as Meta;

export const Default = () => {
  const slider = useSliderState();

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const Reversed = () => {
  const slider = useSliderState({ isReversed: true });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const Min20Max80 = () => {
  const slider = useSliderState({ min: 20, max: 80 });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const Step10 = () => {
  const slider = useSliderState({ step: 10 });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const DefaultValue90 = () => {
  const slider = useSliderState({ defaultValue: 90 });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const Disabled = () => {
  const slider = useSliderState({ isDisabled: true });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const ReadOnly = () => {
  const slider = useSliderState({ isReadOnly: true });

  return (
    <Slider {...slider} style={sliderHorizontalStyle}>
      <SliderTrack {...slider} style={sliderHorizontalTrackStyle}>
        <SliderFilledTrack
          {...slider}
          style={sliderHorizontalFilledTractStyle}
        />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderHorizontalThumbStyle,
          transform: slider.state.isDragging
            ? "translateY(-50%) scale(1.15)"
            : sliderHorizontalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};

export const Vertical = () => {
  const slider = useSliderState({ orientation: "vertical" });

  return (
    <Slider {...slider} style={sliderVerticalStyle}>
      <SliderTrack {...slider} style={sliderVerticalTrackStyle}>
        <SliderFilledTrack {...slider} style={sliderVerticalFilledTractStyle} />
      </SliderTrack>
      <SliderThumb
        {...slider}
        aria-label="slider-thumb"
        style={{
          ...sliderVerticalThumbStyle,
          transform: slider.state.isDragging
            ? "translateX(-50%) scale(1.15)"
            : sliderVerticalThumbStyle.transform,
        }}
      />
      <SliderInput {...slider} name="slider" />
    </Slider>
  );
};
