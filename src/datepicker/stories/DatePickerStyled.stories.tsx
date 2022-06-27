import * as React from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import CalenderStyledCss from "../../calendar/stories/templates/CalendarStyledCss";
import CalenderStyledJsx from "../../calendar/stories/templates/CalendarStyledJsx";
import CalenderStyledTsx from "../../calendar/stories/templates/CalendarStyledTsx";
import DateFieldStyledCsx from "../../datefield/stories/templates/DateFieldStyledCss";
import DateFieldStyledJsx from "../../datefield/stories/templates/DateFieldStyledJsx";
import DateFieldStyledTsx from "../../datefield/stories/templates/DateFieldStyledTsx";

import css from "./templates/DatePickerStyledCss";
import js from "./templates/DatePickerStyledJsx";
import ts from "./templates/DatePickerStyledTsx";
import UtilsJsx from "./templates/UtilsJsx";
import UtilsTsx from "./templates/UtilsTsx";
import { DatePickerStyled } from "./DatePickerStyled.component";

type Meta = ComponentMeta<typeof DatePickerStyled>;
type Story = ComponentStoryObj<typeof DatePickerStyled>;

export default {
  title: "DatePicker/Styled",
  component: DatePickerStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/DatePickerStyled.css": css,
          "src/components/CalendarStyled.component.jsx": CalenderStyledJsx,
          "src/components/DateFieldStyled.component.jsx": DateFieldStyledJsx,
          "src/components/Utils.component.jsx": UtilsJsx,
          "src/components/CalendarStyled.css": CalenderStyledCss,
          "src/components/DateFieldStyled.css": DateFieldStyledCsx,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DatePickerStyled.css": css,
          "src/components/CalendarStyled.component.tsx": CalenderStyledTsx,
          "src/components/DateFieldStyled.component.tsx": DateFieldStyledTsx,
          "src/components/Utils.component.tsx": UtilsTsx,
          "src/components/CalendarStyled.css": CalenderStyledCss,
          "src/components/DateFieldStyled.css": DateFieldStyledCsx,
        },
      },
    }),
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
