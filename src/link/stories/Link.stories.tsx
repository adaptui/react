import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Link } from "./Link.component";
import { linkTemplate, linkTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Link,
  title: "Link",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: linkTemplateJs,
      ts: linkTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Link {...args} />;

export const Default = Base.bind({});
Default.args = {
  href: "#",
};

export const ExternalLink = Base.bind({});
ExternalLink.args = {
  href: "https://reakit.io/",
  isExternal: true,
};

export const SpanLink = Base.bind({});
SpanLink.args = {
  as: "span",
  onClick: () => alert("Custom Link"),
};

export const DisabledExternalLink = Base.bind({});
DisabledExternalLink.args = {
  href: "https://reakit.io/",
  isExternal: true,
  disabled: true,
};

export const DisabledSpanLink = Base.bind({});
DisabledSpanLink.args = {
  as: "span",
  onClick: () => alert("Custom Link"),
  disabled: true,
};
