import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DrawerBasicJsx";
import ts from "./templates/DrawerBasicTsx";
import { DrawerBasic } from "./DrawerBasic.component";

import "./DrawerBasic.css";

type Meta = ComponentMeta<typeof DrawerBasic>;
type Story = ComponentStoryObj<typeof DrawerBasic>;

export default {
  title: "Drawer/Basic",
  component: DrawerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = {
  args: {},
};
