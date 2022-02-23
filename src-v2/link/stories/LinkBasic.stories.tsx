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

export const Default: Story = {
  args: { href: "#", children: "View Story" },
};

export const ExternlaLink: Story = {
  args: {
    children: "Timeless",
    href: "https://timeless.co/",
    isExternal: true,
  },
};

export const DisabledExternalLink: Story = {
  args: {
    children: "Timeless",
    href: "https://timeless.co/",
    isExternal: true,
    disabled: true,
  },
};

// export const DisabledExternalLink = Default.bind({});
// DisabledExternalLink.args = {
//   href: "https://reakit.io/",
//   isExternal: true,
//   disabled: true,
// };

// export const SpanLink = Default.bind({});
// SpanLink.args = {
//   as: "span",
//   onClick: () => alert("Custom Link"),
// };

// export const DisabledSpanLink = Default.bind({});
// DisabledSpanLink.args = {
//   as: "span",
//   onClick: () => alert("Custom Link"),
//   disabled: true,
// };
