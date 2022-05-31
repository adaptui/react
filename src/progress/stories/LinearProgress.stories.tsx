import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/LinearProgressJsx";
import ts from "./templates/LinearProgressTsx";
import { LinearProgress } from "./LinearProgress.component";

type Meta = ComponentMeta<typeof LinearProgress>;
type Story = ComponentStoryObj<typeof LinearProgress>;

export default {
  title: "Progress/Linear",
  component: LinearProgress,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js,
      ts,
      deps: ["@emotion/css@latest"],
    }),
  },
} as Meta;

export const Default: Story = { args: {} };

export const IsIndeterminate: Story = { args: { value: null } };

export const WithLabel = { args: { ...Default.args, withLabel: true } };

export const WithStripe = { args: { ...Default.args, withStripe: true } };

export const WithStripeAnimation = {
  args: { ...Default.args, withStripe: true, withStripeAnimation: true },
};
