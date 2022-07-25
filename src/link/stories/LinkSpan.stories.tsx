import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/LinkSpanJsx";
import ts from "./templates/LinkSpanTsx";
import { LinkSpan } from "./LinkSpan.component";

type Meta = ComponentMeta<typeof LinkSpan>;
type Story = ComponentStoryObj<typeof LinkSpan>;

export default {
  title: "Link/Span",
  component: LinkSpan,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = { args: {} };

export const DisabledLink: Story = { args: { disabled: true } };
