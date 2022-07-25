import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/TimeFieldStyledJsx";
import ts from "./templates/TimeFieldStyledTsx";
import { TimeFieldStyled } from "./TimeFieldStyled.component";

import "./tailwind.css";

type Meta = ComponentMeta<typeof TimeFieldStyled>;
// type Story = ComponentStoryObj<typeof TimeFieldStyled>;

export default {
  title: "TimeField/Styled",
  component: TimeFieldStyled,
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
  return <TimeFieldStyled label="TimeField" />;
};
