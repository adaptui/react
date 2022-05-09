import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/CalendarRangeStyledJsx";
import ts from "./templates/CalendarRangeStyledTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { CalendarRangeStyled } from "./CalendarRangeStyled.component";

import "./tailwind.css";

type Meta = ComponentMeta<typeof CalendarRangeStyled>;
// type Story = ComponentStoryObj<typeof CalendarRangeStyled>;

export default {
  title: "Calendar/RangeStyled",
  component: CalendarRangeStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, jsUtils, tsUtils }),
  },
  decorators: [
    Story => {
      document.body.id = "tailwind";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => {
  let { locale } = useLocale();

  return (
    <CalendarRangeStyled locale={locale} createCalendar={createCalendar} />
  );
};
