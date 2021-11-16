import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/PopoverCollisionJsx";
import ts from "./templates/PopoverCollisionTsx";
import { PopoverCollision } from "./PopoverCollision.component";

export default {
  component: PopoverCollision,
  title: "Popover/Collision",
  parameters: {
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = args => <PopoverCollision {...args} />;
