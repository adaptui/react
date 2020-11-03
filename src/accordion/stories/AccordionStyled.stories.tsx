import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import {
  styledAppTemplate,
  appTemplateStyledJs,
  cssTemplate,
} from "./templates";
import "./AccordionStyled.css";
import { App as Accordion } from "./AccordionStyled.component";

export default {
  component: Accordion,
  title: "AccordionStyled",
  parameters: {
    preview: [
      {
        tab: "ReactJS",
        template: appTemplateStyledJs,
        language: "jsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "React",
        template: styledAppTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX(["renderless-components@alpha"]),
      },
      {
        tab: "CSS",
        template: cssTemplate,
        language: "css",
        copy: true,
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
