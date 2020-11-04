import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Progress } from "./CircularProgress.component";
import { circularAppTemplate, circularAppTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Progress,
  title: "ProgressCircular",
  parameters: {
    preview: createPreviewTabs({
      js: circularAppTemplateJs,
      ts: circularAppTemplate,
      deps: ["reakit@latest", "emotion@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <Progress {...args} />;

export const Default = Base.bind({});

export const WithLabel = Base.bind({});
WithLabel.args = { withLabel: true };

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { value: null };
