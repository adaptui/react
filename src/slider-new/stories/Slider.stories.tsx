import React from "react";
import { Meta } from "@storybook/react";

import { BasicSlider } from "./BasicSlider";
import { RangeSlider } from "./RangeSlider";
import { MultiSlider, MultiSliderThumb } from "./MultiSlider";

export default {
  title: "SliderNew",
} as Meta;

export const Default = () => <BasicSlider label="Size" showTip />;
export const BigSteps = () => <BasicSlider label="Size" showTip step={10} />;
export const Origin = () => (
  <BasicSlider
    label="Exposure"
    origin={0}
    min={-5}
    max={5}
    step={0.1}
    showTip
  />
);

export const Range = () => (
  <RangeSlider
    label="Temperature"
    values={[25, 75]}
    showTip
    formatOptions={
      {
        style: "unit",
        unit: "celsius",
        unitDisplay: "narrow",
      } as any
    }
  />
);

export const Multi = () => (
  <MultiSlider label="Ticks" values={[10, 40, 80]}>
    <MultiSliderThumb label="A" />
    <MultiSliderThumb label="B" />
    <MultiSliderThumb label="C" />
  </MultiSlider>
);
