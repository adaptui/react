import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DrawerBasicJsx";
import ts from "./templates/DrawerBasicTsx";
import { Drawer } from "./DrawerBasic.component";

export default {
  component: Drawer,
  title: "Drawer/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, deps: ["@emotion/css@latest"] }),
  },
} as Meta;

export const Default: Story = args => <Drawer {...args} />;
