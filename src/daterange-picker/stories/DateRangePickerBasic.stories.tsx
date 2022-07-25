import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/DateRangePickerBasicCss";
import js from "./templates/DateRangePickerBasicJsx";
import ts from "./templates/DateRangePickerBasicTsx";
import { DateRangePickerBasic } from "./DateRangePickerBasic.component";

import "./DateRangePickerBasic.css";

type Meta = ComponentMeta<typeof DateRangePickerBasic>;
type Story = ComponentStoryObj<typeof DateRangePickerBasic>;

export default {
  title: "DateRangePicker/Basic",
  component: DateRangePickerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
  decorators: [
    Story => {
      document.body.id = "date-range-picker-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: { label: "DateRangePicker" },
};
