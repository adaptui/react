import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import "./Breadcrumbs.css";
import { appTemplate, appTemplateJs } from "./templates";
import { App as Breadcrumbs } from "./Breadcrumbs.component";

export default {
  component: Breadcrumbs,
  title: "Breadcrumbs",
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

const Base: Story = args => <Breadcrumbs {...args} />;

export const Default = Base.bind({});
