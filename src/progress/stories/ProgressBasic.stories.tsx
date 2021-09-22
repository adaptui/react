import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/ProgressBasicCss";
import js from "./templates/ProgressBasicJsx";
import ts from "./templates/ProgressBasicTsx";
import { Progress } from "./ProgressBasic.component";

import "./ProgressBasic.css";

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
