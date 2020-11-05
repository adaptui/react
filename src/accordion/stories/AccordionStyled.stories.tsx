import * as React from "react";
import { Meta, Story } from "@storybook/react";

import {
  accordionStyledTemplate,
  accordionStyledTemplateJs,
  accordionStyledStyleCssTemplate,
} from "./templates";
import "./AccordionStyled.css";
import { App as Accordion } from "./AccordionStyled.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Accordion,
  title: "AccordionStyled",
  parameters: {
    preview: createPreviewTabs({
      js: accordionStyledTemplate,
      ts: accordionStyledTemplateJs,
      css: accordionStyledStyleCssTemplate,
    }),
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
