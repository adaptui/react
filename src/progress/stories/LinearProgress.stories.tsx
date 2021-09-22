import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/LinearProgressJsx";
import ts from "./templates/LinearProgressTsx";
import { Progress } from "./LinearProgress.component";

export default {
  component: Progress,
  title: "Progress/Linear",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js,
      ts,
      deps: ["reakit@latest", "@emotion/css@latest"],
    }),
  },
} as Meta;

export const Default: Story = args => <Progress {...args} />;

export const WithLabel = Default.bind({});
WithLabel.args = { withLabel: true };

export const WithStripe = Default.bind({});
WithStripe.args = { withStripe: true };

export const WithStripeAnimation = Default.bind({});
WithStripeAnimation.args = {
  withStripe: true,
  withStripeAnimation: true,
};

export const IsIndeterminate = Default.bind({});
IsIndeterminate.args = { value: null };
