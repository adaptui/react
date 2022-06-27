import * as React from "react";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/CalendarStyledCss";
import js from "./templates/CalendarStyledJsx";
import ts from "./templates/CalendarStyledTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import { CalendarStyled } from "./CalendarStyled.component";

type Meta = ComponentMeta<typeof CalendarStyled>;
// type Story = ComponentStoryObj<typeof CalendarStyled>;

export default {
  title: "Calendar/Styled",
  component: CalendarStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/CalendarStyled.css": css,
          "src/components/Utils.component.jsx": jsUtils,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/CalendarStyled.css": css,
          "src/components/Utils.component.tsx": tsUtils,
        },
      },
      jsUtils,
      tsUtils,
    }),
  },
} as Meta;

export const Default = () => <CalendarStyled />;
