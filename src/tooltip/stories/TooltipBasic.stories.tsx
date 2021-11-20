import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TooltipBasicCss";
import js from "./templates/TooltipBasicJsx";
import ts from "./templates/TooltipBasicTsx";
import { TooltipBasic } from "./TooltipBasic.component";

import "./TooltipBasic.css";

export default {
  component: TooltipBasic,
  title: "Tooltip/Basic",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => <TooltipBasic {...args} />;

export const NoCollisionDetection: Story = args => (
  <TooltipBasic enableCollisionsDetection={false} {...args} />
);
