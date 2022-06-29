import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";
import CalederRangeStyledCss from "../../calendar/stories/templates/CalendarRangeStyledCss";
import CalederRangeStyledJsx from "../../calendar/stories/templates/CalendarRangeStyledJsx";
import CalederRangeStyledTsx from "../../calendar/stories/templates/CalendarRangeStyledTsx";
import DateFieldStyledCss from "../../datefield/stories/templates/DateFieldStyledCss";
import DateFieldStyledJsx from "../../datefield/stories/templates/DateFieldStyledJsx";
import DateFieldStyledTsx from "../../datefield/stories/templates/DateFieldStyledTsx";

import css from "./templates/DateRangePickerStyledCss";
import js from "./templates/DateRangePickerStyledJsx";
import ts from "./templates/DateRangePickerStyledTsx";
import UtilsJsx from "./templates/UtilsJsx";
import UtilsTsx from "./templates/UtilsTsx";
import { DateRangePickerStyled } from "./DateRangePickerStyled.component";

import "./DateRangePickerStyled.css";

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
          "src/components/DateRangePickerStyled.css": css,
          "src/App.js": CreateAppTemplate({ label: "DateRangePicker" }),
          "src/components/CalendarRangeStyled.component.jsx":
            CalederRangeStyledJsx,
          "src/components/CalendarRangeStyled.css": CalederRangeStyledCss,
          "src/components/Utils.component.jsx": UtilsJsx,
          "src/components/DateFieldStyled.component.jsx": DateFieldStyledJsx,
          "src/components/DateFieldStyled.css": DateFieldStyledCss,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DateRangePickerStyled.css": css,
          "src/App.tsx": CreateAppTemplate({ label: "DateRangePicker" }),
          "src/components/CalendarRangeStyled.component.tsx":
            CalederRangeStyledTsx,
          "src/components/CalendarRangeStyled.css": CalederRangeStyledCss,
          "src/components/Utils.component.tsx": UtilsTsx,
          "src/components/DateFieldStyled.component.tsx": DateFieldStyledTsx,
          "src/components/DateFieldStyled.css": DateFieldStyledCss,
        },
      },
      css,
    }),
  },
} as Meta;

export const Default: Story = {
  args: { label: "DateRangePicker" },
};
