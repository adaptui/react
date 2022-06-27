import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/CircularProgressJsx";
import ts from "./templates/CircularProgressTsx";
import { CircularProgress } from "./CircularProgress.component";

type Meta = ComponentMeta<typeof CircularProgress>;
type Story = ComponentStoryObj<typeof CircularProgress>;

export default {
  component: CircularProgress,
  title: "Progress/Circular",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
      },
      ts: {
        template: ts,
      },
      deps: ["reakit@latest", "@emotion/css@latest"],
    }),
  },
} as Meta;

export const Default: Story = { args: {} };

export const IsIndeterminate: Story = { args: { value: null } };

export const WithLabel: Story = { args: { ...Default.args, withLabel: true } };
