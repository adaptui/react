import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/LinkBasicJsx";
import ts from "./templates/LinkBasicTsx";
import { LinkBasic } from "./LinkBasic.component";

type Meta = ComponentMeta<typeof LinkBasic>;
type Story = ComponentStoryObj<typeof LinkBasic>;

export default {
  title: "Link/Basic",
  component: LinkBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = { args: {} };

export const DisabledLink: Story = {
  args: { disabled: true },
};
