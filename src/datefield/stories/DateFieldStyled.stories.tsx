import React from "react";
import { ComponentMeta } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import css from "./templates/DateFieldStyledCss";
import js from "./templates/DateFieldStyledJsx";
import ts from "./templates/DateFieldStyledTsx";
import { DateFieldStyled } from "./DateFieldStyled.component";

type Meta = ComponentMeta<typeof DateFieldStyled>;
// type Story = ComponentStoryObj<typeof DateFieldStyled>;

export default {
  title: "DateField/Styled",
  component: DateFieldStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/DateFieldStyled.css": css,
          "src/App.js": CreateAppTemplate({
            label: "DateField",
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DateFieldStyled.css": css,
          "src/App.tsx": CreateAppTemplate({
            label: "DateField",
          }),
        },
      },
    }),
  },
} as Meta;

export const Default = () => {
  return <DateFieldStyled label="DateField" />;
};
