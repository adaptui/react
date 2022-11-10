import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/RangeCalendarStyledJsx";
import ts from "./templates/RangeCalendarStyledTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { RangeCalendarStyled } from "./RangeCalendarStyled.component";

type Meta = ComponentMeta<typeof RangeCalendarStyled>;

export default {
  title: "RangeCalendar/Styled",
  component: RangeCalendarStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, jsUtils, tsUtils }),
  },
} as Meta;

export const Default = () => {
  return <RangeCalendarStyled />;
};
