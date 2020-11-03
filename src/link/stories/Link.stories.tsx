import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { App as Link } from "./Link.component";
import { appTemplate, appTemplateJs } from "./templates";

export default {
  component: Link,
  title: "Link",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateJs,
        language: "jsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "React",
        template: appTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
    ],
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
