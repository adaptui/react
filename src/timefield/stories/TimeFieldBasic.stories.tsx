import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TimeFieldBasicCss";
import js from "./templates/TimeFieldBasicJsx";
import ts from "./templates/TimeFieldBasicTsx";
import { TimeFieldBasic } from "./TimeFieldBasic.component";

import "./TimeFieldBasic.css";

type Meta = ComponentMeta<typeof TimeFieldBasic>;
// type Story = ComponentStoryObj<typeof TimeFieldBasic>;

export default {
  title: "TimeField/Basic",
  component: TimeFieldBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default = () => {
  return <TimeFieldBasic label="TimeField" />;
};
