import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TooltipCustomDurationCss";
import js from "./templates/TooltipCustomDurationJsx";
import ts from "./templates/TooltipCustomDurationTsx";
import { TooltipCustomDuration } from "./TooltipCustomDuration.component";

import "./TooltipCustomDuration.css";

export default {
  component: TooltipCustomDuration,
  title: "Tooltip/CustomDuration",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => <TooltipCustomDuration {...args} />;
