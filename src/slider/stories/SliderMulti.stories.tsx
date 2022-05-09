import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SliderBasicCss";
import js from "./templates/SliderMultiJsx";
import ts from "./templates/SliderMultiTsx";
import { SliderMulti } from "./SliderMulti.component";

import "./SliderBasic.css";

type Meta = ComponentMeta<typeof SliderMulti>;
type Story = ComponentStoryObj<typeof SliderMulti>;

export default {
  title: "Slider/Multi",
  component: SliderMulti,
  parameters: {
    layout: "centered",
    parameters: { preview: createPreviewTabs({ js, ts, css }) },
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "slider-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: {
    defaultValue: [25, 50, 75],
  },
};

export const ThumbTip: Story = {
  args: {
    defaultValue: [25, 50, 75],
    label: "Thumb Tipped",
    showTip: true,
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: [25, 50, 75],
    label: "Vertical",
    orientation: "vertical",
  },
};

export const MinMax: Story = {
  args: {
    defaultValue: [25, 50, 75],
    label: "Min Max",
    minValue: 20,
    maxValue: 80,
  },
};

export const Step: Story = {
  args: {
    defaultValue: [25, 50, 75],
    label: "Stepped",
    step: 10,
  },
};

export const DefaultValue: Story = {
  args: {
    label: "Default Valued",
    defaultValue: [10, 20, 30],
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [25, 50, 75],
    label: "Disabled",
    isDisabled: true,
  },
};
