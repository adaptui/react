import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import css from "./templates/ProgressBasicCss";
import js from "./templates/ProgressBasicJsx";
import ts from "./templates/ProgressBasicTsx";
import { ProgressBasic } from "./ProgressBasic.component";

type Meta = ComponentMeta<typeof ProgressBasic>;
type Story = ComponentStoryObj<typeof ProgressBasic>;

export default {
  title: "Progress/Basic",
  component: ProgressBasic,
} as Meta;

export const Default: Story = {
  args: { value: 50 },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/ProgressBasic.css": css,
          "src/App.js": CreateAppTemplate({ value: 50 }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/ProgressBasic.css": css,
          "src/App.tsx": CreateAppTemplate({ value: 50 }),
        },
      },
      css,
    }),
  },
};

export const IsIndeterminate = {
  args: { value: null },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/ProgressBasic.css": css,
          "src/App.js": CreateAppTemplate({ value: null }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/ProgressBasic.css": css,
          "src/App.tsx": CreateAppTemplate({ value: null }),
        },
      },
      css,
    }),
  },
};
