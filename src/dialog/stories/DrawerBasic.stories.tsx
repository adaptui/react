import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/DrawerBasicCss";
import js from "./templates/DrawerBasicJsx";
import ts from "./templates/DrawerBasicTsx";
import { DrawerBasic } from "./DrawerBasic.component";

type Meta = ComponentMeta<typeof DrawerBasic>;
type Story = ComponentStoryObj<typeof DrawerBasic>;

export default {
  title: "Drawer/Basic",
  component: DrawerBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/components/DrawerBasic.css": css,
        },
      },
      ts: {
        template: ts,
        files: {
          "src/components/DrawerBasic.css": css,
        },
      },
    }),
  },
} as Meta;

export const Default: Story = {
  args: {},
};
