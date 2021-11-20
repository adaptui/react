import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TooltipCustomContentCss";
import js from "./templates/TooltipCustomContentJsx";
import ts from "./templates/TooltipCustomContentTsx";
import { TooltipCustomContent } from "./TooltipCustomContent.component";

import "./TooltipCustomContent.css";

export default {
  component: TooltipCustomContent,
  title: "Tooltip/CustomContent",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => <TooltipCustomContent {...args} />;
