import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DisclosureHorizontalCollapseBasicJsx";
import ts from "./templates/DisclosureHorizontalCollapseBasicTsx";
import { DisclosureHorizontalCollapseBasic } from "./DisclosureHorizontalCollapseBasic.component";

type Meta = ComponentMeta<typeof DisclosureHorizontalCollapseBasic>;
type Story = ComponentStoryObj<typeof DisclosureHorizontalCollapseBasic>;

export default {
  title: "Disclosure/Horizontal",
  component: DisclosureHorizontalCollapseBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = { args: {} };
