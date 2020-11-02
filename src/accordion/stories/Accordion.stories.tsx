import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { appTemplate, appTemplateJs } from "./templates";
import { App as Accordion } from "./Accordion.component";

export default {
  component: Accordion,
  title: "Accordion",
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

const Base: Story = args => <Accordion {...args} />;

export const Default = Base.bind({});

export const DefaultSelected = Base.bind({});
DefaultSelected.args = { selectedId: "accordion3" };

export const AutoSelect = Base.bind({});
AutoSelect.args = { manual: false };

export const Loop = Base.bind({});
Loop.args = { loop: true };

export const AllowToggle = Base.bind({});
AllowToggle.args = { allowToggle: true };

export const AllowMultiple = Base.bind({});
AllowMultiple.args = { allowMultiple: true };
