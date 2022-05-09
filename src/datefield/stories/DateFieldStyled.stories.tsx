import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DateFieldStyledJsx";
import ts from "./templates/DateFieldStyledTsx";
import { DateFieldStyled } from "./DateFieldStyled.component";

import "./tailwind.css";

type Meta = ComponentMeta<typeof DateFieldStyled>;
// type Story = ComponentStoryObj<typeof DateFieldStyled>;

export default {
  title: "DateField/Styled",
  component: DateFieldStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
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
    <DateFieldStyled
      locale={locale}
      createCalendar={createCalendar}
      label="DateField"
    />
  );
};
