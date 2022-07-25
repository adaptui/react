import * as React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/CalendarStyledJsx";
import ts from "./templates/CalendarStyledTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { CalendarStyled } from "./CalendarStyled.component";

import "./tailwind.css";

type Meta = ComponentMeta<typeof CalendarStyled>;
// type Story = ComponentStoryObj<typeof CalendarStyled>;

export default {
  title: "Calendar/Styled",
  component: CalendarStyled,
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
  return <CalendarStyled />;
};
