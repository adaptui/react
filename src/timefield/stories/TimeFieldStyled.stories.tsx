import React from "react";
import { useLocale } from "@react-aria/i18n";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TimeFieldStyledCss";
import js from "./templates/TimeFieldStyledJsx";
import ts from "./templates/TimeFieldStyledTsx";
import { TimeFieldStyled } from "./TimeFieldStyled.component";

type Meta = ComponentMeta<typeof TimeFieldStyled>;
// type Story = ComponentStoryObj<typeof TimeFieldStyled>;

const CreateAppTemplate = () => `
  import React from "react";
  import Component from "./components";
  import { useLocale } from "@react-aria/i18n";

  export default function App() {
    let { locale } = useLocale();
    return <Component locale={locale} label="TimeField"/>
  }
`;

export default {
  title: "TimeField/Styled",
  component: TimeFieldStyled,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/TimeFieldStyled.css": css,
          "src/App.js": CreateAppTemplate(),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/TimeFieldStyled.css": css,
          "src/App.tsx": CreateAppTemplate(),
        },
      },
    }),
  },
  decorators: [
    Story => {
      // document.body.id = "tailwind";
      return <Story />;
    },
  ],
} as Meta;

export const Default = () => {
  let { locale } = useLocale();

  return <TimeFieldStyled locale={locale} label="TimeField" />;
};
