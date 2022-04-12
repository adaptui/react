import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DatePickerStyledJsx";
import ts from "./templates/DatePickerStyledTsx";
import { DatePickerStyled } from "./DatePickerStyled.component";

import "./tailwind.css";

type Meta = ComponentMeta<typeof DatePickerStyled>;
type Story = ComponentStoryObj<typeof DatePickerStyled>;

export default {
  title: "DatePicker/Styled",
  component: DatePickerStyled,
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
  args: { label: "DatePicker" },
};
