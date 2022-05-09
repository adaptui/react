import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/DatePickerBasicCss";
import js from "./templates/DatePickerBasicJsx";
import ts from "./templates/DatePickerBasicTsx";
import { DatePickerBasic } from "./DatePickerBasic.component";

import "./DatePickerBasic.css";

type Meta = ComponentMeta<typeof DatePickerBasic>;
type Story = ComponentStoryObj<typeof DatePickerBasic>;

export default {
  title: "DatePicker/Basic",
  component: DatePickerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = {
  args: { label: "DatePicker" },
};
