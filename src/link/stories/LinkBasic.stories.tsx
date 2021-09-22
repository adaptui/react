import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { LinkProps } from "../index";

import js from "./templates/LinkBasicJsx";
import ts from "./templates/LinkBasicTsx";
import { Link } from "./LinkBasic.component";

export default {
  component: Link,
  title: "Link/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story<LinkProps> = args => <Link {...args} />;
Default.args = {
  // @ts-ignore
  href: "#",
};

export const ExternalLink = Default.bind({});
ExternalLink.args = {
  href: "https://reakit.io/",
  isExternal: true,
};

export const SpanLink = Default.bind({});
SpanLink.args = {
  as: "span",
  onClick: () => alert("Custom Link"),
};

export const DisabledExternalLink = Default.bind({});
DisabledExternalLink.args = {
  href: "https://reakit.io/",
  isExternal: true,
  disabled: true,
};

export const DisabledSpanLink = Default.bind({});
DisabledSpanLink.args = {
  as: "span",
  onClick: () => alert("Custom Link"),
  disabled: true,
};
