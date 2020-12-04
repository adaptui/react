import * as React from "react";
import { Meta, Story } from "@storybook/react";

import {
  progressBasicCssTemplate,
  progressBasicTemplate,
  progressBasicTemplateJs,
} from "./templates";
import "./ProgressBasic.css";
import { App as Progress } from "./ProgressBasic.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Progress,
  title: "Progress/Basic",
  parameters: {
    preview: createPreviewTabs({
      js: progressBasicTemplateJs,
      ts: progressBasicTemplate,
      css: progressBasicCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Progress {...args} />;

export const Default = Base.bind({});
Default.args = { value: 50 };

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { value: null };
