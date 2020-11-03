import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { appTemplate, appTemplateJs } from "./templates";
import { App as PickerBase } from "./PickerBase.component";

export default {
  component: PickerBase,
  title: "PickerBase",
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

const Base: Story = args => <PickerBase {...args} />;

export const Default = Base.bind({});

export const AlwaysVisible = Base.bind({});
AlwaysVisible.args = {
  visible: true,
};
