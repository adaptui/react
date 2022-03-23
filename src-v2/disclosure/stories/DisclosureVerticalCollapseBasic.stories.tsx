import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/DisclosureVerticalCollapseBasicJsx";
import ts from "./templates/DisclosureVerticalCollapseBasicTsx";
import { DisclosureVerticalCollapseBasic } from "./DisclosureVerticalCollapseBasic.component";

type Meta = ComponentMeta<typeof DisclosureVerticalCollapseBasic>;
type Story = ComponentStoryObj<typeof DisclosureVerticalCollapseBasic>;

export default {
  title: "Disclosure/Vertical",
  component: DisclosureVerticalCollapseBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = {
  args: {},
};
