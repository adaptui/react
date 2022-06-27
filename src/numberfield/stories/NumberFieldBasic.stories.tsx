import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import js from "./templates/NumberFieldBasicJsx";
import ts from "./templates/NumberFieldBasicTsx";
import { NumberFieldBasic } from "./NumberFieldBasic.component";

type Meta = ComponentMeta<typeof NumberFieldBasic>;
type Story = ComponentStoryObj<typeof NumberFieldBasic>;

export default {
  title: "NumberField/Basic",
  component: NumberFieldBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({ label: "NumberField" }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({ label: "NumberField" }),
        },
      },
    }),
  },
} as Meta;

export const Default: Story = {
  args: { label: "NumberField" },
};
