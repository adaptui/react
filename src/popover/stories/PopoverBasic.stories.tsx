import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/PopoverBasicJsx";
import ts from "./templates/PopoverBasicTsx";
import { PopoverBasic } from "./PopoverBasic.component";

import "./PopoverBasic.css";

export default {
  component: PopoverBasic,
  title: "Popover/Basic",
  parameters: {
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = args => (
  <PopoverBasic enableCollisionsDetection={false} {...args} />
);
