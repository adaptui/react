import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/DatePickerStyledCss";
import js from "./templates/DateRangePickerStyledJsx";
import ts from "./templates/DateRangePickerStyledTsx";
import { DateRangePickerStyled } from "./DateRangePickerStyled.component";

type Meta = ComponentMeta<typeof DateRangePickerStyled>;
type Story = ComponentStoryObj<typeof DateRangePickerStyled>;

export default {
  title: "DatePicker/RangeStyled",
  component: DateRangePickerStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/DatePickerStyled.css": css,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DatePickerStyled.css": css,
        },
      },
      css,
    }),
  },
} as Meta;

export const Default: Story = {
  args: { label: "DateRangePicker" },
};
