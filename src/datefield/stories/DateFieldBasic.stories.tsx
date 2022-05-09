import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/DateFieldBasicCss";
import js from "./templates/DateFieldBasicJsx";
import ts from "./templates/DateFieldBasicTsx";
import { DateFieldBasic } from "./DateFieldBasic.component";

import "./DateFieldBasic.css";

type Meta = ComponentMeta<typeof DateFieldBasic>;
// type Story = ComponentStoryObj<typeof DateFieldBasic>;

export default {
  title: "DateField/Basic",
  component: DateFieldBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default = () => {
  let { locale } = useLocale();

  return (
    <DateFieldBasic
      locale={locale}
      createCalendar={createCalendar}
      label="DateField"
    />
  );
};
