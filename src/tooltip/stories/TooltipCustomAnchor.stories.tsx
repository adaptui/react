import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TooltipCustomAnchorCss";
import js from "./templates/TooltipCustomAnchorJsx";
import ts from "./templates/TooltipCustomAnchorTsx";
import { TooltipCustomAnchor } from "./TooltipCustomAnchor.component";

import "./TooltipCustomAnchor.css";

export default {
  component: TooltipCustomAnchor,
  title: "Tooltip/CustomAnchor",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => (
  <TooltipCustomAnchor enableCollisionsDetection={false} {...args} />
);
