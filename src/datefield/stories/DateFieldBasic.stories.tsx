import React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/DateFieldBasicCss";
import js from "./templates/DateFieldBasicJsx";
import ts from "./templates/DateFieldBasicTsx";
import { DateFieldBasic } from "./DateFieldBasic.component";

type Meta = ComponentMeta<typeof DateFieldBasic>;
// type Story = ComponentStoryObj<typeof DateFieldBasic>;

export default {
  title: "DateField/Basic",
  component: DateFieldBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/DateFieldBasic.css": css,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DateFieldBasic.css": css,
        },
      },
      css,
    }),
  },
} as Meta;

export const Default = () => {
  return <DateFieldBasic label="DateField" />;
};
