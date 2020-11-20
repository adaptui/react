import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Progress } from "./CircularProgress.component";
import {
  circularProgressTemplate,
  circularProgressTemplateJs,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Progress,
  title: "Progress/Circular",
  parameters: {
    preview: createPreviewTabs({
      js: circularProgressTemplateJs,
      ts: circularProgressTemplate,
      deps: ["reakit@latest", "@emotion/css@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <Progress {...args} />;

export const Default = Base.bind({});

export const WithLabel = Base.bind({});
WithLabel.args = { withLabel: true };

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { value: null };
