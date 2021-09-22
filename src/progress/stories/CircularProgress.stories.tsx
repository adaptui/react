import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/CircularProgressJsx";
import ts from "./templates/CircularProgressTsx";
import { Progress } from "./CircularProgress.component";

export default {
  component: Progress,
  title: "Progress/Circular",
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

export const IsIndeterminate = Default.bind({});
IsIndeterminate.args = { value: null };
