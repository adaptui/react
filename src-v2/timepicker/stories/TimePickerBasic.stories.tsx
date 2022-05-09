import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TimePickerBasicCss";
import js from "./templates/TimePickerBasicJsx";
import ts from "./templates/TimePickerBasicTsx";
import { TimePickerBasic } from "./TimePickerBasic.component";

import "./TimePickerBasic.css";

type Meta = ComponentMeta<typeof TimePickerBasic>;
type Story = ComponentStoryObj<typeof TimePickerBasic>;

export default {
  title: "TimePicker/Basic",
  component: TimePickerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = {
  args: { label: "TimePicker" },
};
