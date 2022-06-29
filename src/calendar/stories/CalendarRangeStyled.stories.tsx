import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/CalendarRangeStyledJsx";
import ts from "./templates/CalendarRangeStyledTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { CalendarRangeStyled } from "./CalendarRangeStyled.component";

type Meta = ComponentMeta<typeof CalendarRangeStyled>;
// type Story = ComponentStoryObj<typeof CalendarRangeStyled>;

export default {
  title: "Calendar/RangeStyled",
  component: CalendarRangeStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: { template: js },
      ts: { template: ts },
      jsUtils,
      tsUtils,
    }),
  },
} as Meta;

export const Default = () => <CalendarRangeStyled />;
