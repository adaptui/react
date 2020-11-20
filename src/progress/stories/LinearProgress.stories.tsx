import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Progress } from "./LinearProgress.component";
import { linearProgressTemplate, linearProgressTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Progress,
  title: "Progress/Linear",
  parameters: {
    preview: createPreviewTabs({
      js: linearProgressTemplateJs,
      ts: linearProgressTemplate,
      deps: ["reakit@latest", "@emotion/css@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <Progress {...args} />;

export const Default = Base.bind({});

export const WithLabel = Base.bind({});
WithLabel.args = { withLabel: true };

export const WithStripe = Base.bind({});
WithStripe.args = { withStripe: true };

export const WithStripeAnimation = Base.bind({});
WithStripeAnimation.args = {
  withStripe: true,
  withStripeAnimation: true,
};

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { value: null };
