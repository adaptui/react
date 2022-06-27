import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";
import CalendarBasicCss from "../../calendar/stories/templates/CalendarBasicCss";
import CalendarBasicJsx from "../../calendar/stories/templates/CalendarBasicJsx";
import CalendarBasicTsx from "../../calendar/stories/templates/CalendarBasicTsx";
import DateFieldBasicCss from "../../datefield/stories/templates/DateFieldBasicCss";
import DateFieldBasicJsx from "../../datefield/stories/templates/DateFieldBasicJsx";
import DateFieldBasicTsx from "../../datefield/stories/templates/DateFieldBasicTsx";

import css from "./templates/DatePickerBasicCss";
import js from "./templates/DatePickerBasicJsx";
import ts from "./templates/DatePickerBasicTsx";
import UtilsJsx from "./templates/UtilsJsx";
import UtilsTsx from "./templates/UtilsTsx";
import { DatePickerBasic } from "./DatePickerBasic.component";

type Meta = ComponentMeta<typeof DatePickerBasic>;
type Story = ComponentStoryObj<typeof DatePickerBasic>;

export default {
  title: "DatePicker/Basic",
  component: DatePickerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({ label: "DatePicker" }),
          "src/components/CalendarBasic.component.jsx": CalendarBasicJsx,
          "src/components/DateFieldBasic.component.jsx": DateFieldBasicJsx,
          "src/components/DatePickerBasic.css": css,
          "src/components/Utils.component.jsx": UtilsJsx,
          "src/components/CalendarBasic.css": CalendarBasicCss,
          "src/components/DateFieldBasic.css": DateFieldBasicCss,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({ label: "DatePicker" }),
          "src/components/CalendarBasic.component.tsx": CalendarBasicTsx,
          "src/components/DateFieldBasic.component.tsx": DateFieldBasicTsx,
          "src/components/DatePickerBasic.css": css,
          "src/components/Utils.component.tsx": UtilsTsx,
          "src/components/CalendarBasic.css": CalendarBasicCss,
          "src/components/DateFieldBasic.css": DateFieldBasicCss,
        },
      },
      css,
    }),
  },
} as Meta;

export const Default: Story = {
  args: { label: "DatePicker" },
};
