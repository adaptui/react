import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/CalendarRangeCss";
import js from "./templates/CalendarRangeJsx";
import ts from "./templates/CalendarRangeTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { CalendarRange } from "./CalendarRange.component";

import "./CalendarRange.css";

type Meta = ComponentMeta<typeof CalendarRange>;
type Story = ComponentStoryObj<typeof CalendarRange>;

export default {
  title: "Calendar/Range",
  component: CalendarRange,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default: Story = {
  args: {},
};
