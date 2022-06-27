import React from "react";
import { useLocale } from "@react-aria/i18n";
import { ComponentMeta } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TimeFieldBasicCss";
import js from "./templates/TimeFieldBasicJsx";
import ts from "./templates/TimeFieldBasicTsx";
import { TimeFieldBasic } from "./TimeFieldBasic.component";

type Meta = ComponentMeta<typeof TimeFieldBasic>;
// type Story = ComponentStoryObj<typeof TimeFieldBasic>;

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
  title: "TimeField/Basic",
  component: TimeFieldBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate(),
          "src/components/TimeFieldBasic.css": css,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate(),
          "src/components/TimeFieldBasic.css": css,
        },
      },
      css,
      deps: ["@react-aria/i18n@latest"],
    }),
  },
} as Meta;

export const Default = () => {
  let { locale } = useLocale();

  return <TimeFieldBasic locale={locale} label="TimeField" />;
};
