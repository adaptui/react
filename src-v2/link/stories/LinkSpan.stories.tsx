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

export const Default: Story = {
  args: {
    children: "View Link as Span",
    onClick: () => alert("Custom View Story"),
  },
};

export const DisabledLink: Story = {
  args: {
    children: "View Link as Span",
    onClick: () => alert("Custom View Story"),
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
