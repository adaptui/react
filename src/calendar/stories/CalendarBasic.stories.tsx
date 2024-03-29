import * as React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/CalendarBasicCss";
import js from "./templates/CalendarBasicJsx";
import ts from "./templates/CalendarBasicTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { CalendarBasic } from "./CalendarBasic.component";

import "./CalendarBasic.css";

type Meta = ComponentMeta<typeof CalendarBasic>;
// type Story = ComponentStoryObj<typeof CalendarBasic>;

export default {
  title: "Calendar/Basic",
  component: CalendarBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
  },
} as Meta;

export const Default = () => {
  return <CalendarBasic />;
};
