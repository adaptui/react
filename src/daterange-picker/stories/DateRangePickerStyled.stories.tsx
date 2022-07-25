import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DateRangePickerStyledJsx";
import ts from "./templates/DateRangePickerStyledTsx";
import { DateRangePickerStyled } from "./DateRangePickerStyled.component";

import "./tailwind.css";

type Meta = ComponentMeta<typeof DateRangePickerStyled>;
type Story = ComponentStoryObj<typeof DateRangePickerStyled>;

export default {
  title: "DateRangePicker/Styled",
  component: DateRangePickerStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
  decorators: [
    Story => {
      document.body.id = "tailwind";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = {
  args: { label: "DateRangePicker" },
};
