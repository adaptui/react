import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/TooltipPositionsCss";
import js from "./templates/TooltipPositionsJsx";
import ts from "./templates/TooltipPositionsTsx";
import { TooltipPositions } from "./TooltipPositions.component";

import "./TooltipPositions.css";

export default {
  component: TooltipPositions,
  title: "Tooltip/Positions",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = args => <TooltipPositions {...args} />;
