import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/RangeCalendarBasicCss";
import js from "./templates/RangeCalendarBasicJsx";
import ts from "./templates/RangeCalendarBasicTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { RangeCalendarBasic } from "./RangeCalendarBasic.component";

import "./RangeCalendarBasic.css";

type Meta = ComponentMeta<typeof RangeCalendarBasic>;
// type Story = ComponentStoryObj<typeof RangeCalendarBasic>;

export default {
  title: "RangeCalendar/Basic",
  component: RangeCalendarBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default = () => {
  return <RangeCalendarBasic />;
};
