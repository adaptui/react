import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./ProgressBasic.css";
import js from "./templates/ProgressBasicJsx";
import ts from "./templates/ProgressBasicTsx";
import css from "./templates/ProgressBasicCss";
import { Progress } from "./ProgressBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Progress,
  title: "Progress/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => <Progress {...args} />;
Default.args = { value: 50 };

export const IsIndeterminate = Default.bind({});
IsIndeterminate.args = { value: null };
