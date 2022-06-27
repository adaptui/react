import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import CalendarBasicCss from "../../calendar/stories/templates/CalendarBasicCss";
import CalendarBasicJsx from "../../calendar/stories/templates/CalendarBasicJsx";
import CalendarBasicTsx from "../../calendar/stories/templates/CalendarBasicTsx";
import CalenderRangeCss from "../../calendar/stories/templates/CalendarRangeCss";
import CalenderRangeJsx from "../../calendar/stories/templates/CalendarRangeJsx";
import CalenderRangeTsx from "../../calendar/stories/templates/CalendarRangeTsx";
import DateFieldBasicCss from "../../datefield/stories/templates/DateFieldBasicCss";
import DateFieldBasicJsx from "../../datefield/stories/templates/DateFieldBasicJsx";
import DateFieldBasicTsx from "../../datefield/stories/templates/DateFieldBasicTsx";

import DatePickerBasicCss from "./templates/DatePickerBasicCss";
import DatePickerBasicJsx from "./templates/DatePickerBasicJsx";
import DatePickerBasicTsx from "./templates/DatePickerBasicTsx";
import css from "./templates/DateRangePickerBasicCss";
import js from "./templates/DateRangePickerBasicJsx";
import ts from "./templates/DateRangePickerBasicTsx";
import UtilsJsx from "./templates/UtilsJsx";
import UtilsTsx from "./templates/UtilsTsx";
import { DateRangePickerBasic } from "./DateRangePickerBasic.component";

type Meta = ComponentMeta<typeof DateRangePickerBasic>;
type Story = ComponentStoryObj<typeof DateRangePickerBasic>;

export default {
  title: "DatePicker/Range",
  component: DateRangePickerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/DateRangePickerBasic.css": css,
          "src/components/CalendarRange.component.jsx": CalenderRangeJsx,
          "src/components/DateFieldBasic.component.jsx": DateFieldBasicJsx,
          "src/components/CalendarRange.css": CalenderRangeCss,
          "src/components/DateFieldBasic.css": DateFieldBasicCss,
          "src/components/Utils.component.jsx": UtilsJsx,
          "src/components/DatePickerBasic.component.jsx": DatePickerBasicJsx,
          "src/components/DatePickerBasic.css": DatePickerBasicCss,
          "src/components/CalendarBasic.component.jsx": CalendarBasicJsx,
          "src/components/CalendarBasic.css": CalendarBasicCss,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DateRangePickerBasic.css": css,
          "src/components/CalendarRange.component.tsx": CalenderRangeTsx,
          "src/components/DateFieldBasic.component.tsx": DateFieldBasicTsx,
          "src/components/CalendarRange.css": CalenderRangeCss,
          "src/components/DateFieldBasic.css": DateFieldBasicCss,
          "src/components/Utils.component.tsx": UtilsTsx,
          "src/components/DatePickerBasic.component.tsx": DatePickerBasicTsx,
          "src/components/DatePickerBasic.css": DatePickerBasicCss,
          "src/components/CalendarBasic.component.tsx": CalendarBasicTsx,
          "src/components/CalendarBasic.css": CalendarBasicCss,
        },
      },
      css,
    }),
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
