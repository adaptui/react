import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/AccordionStyledCss";
import js from "./templates/AccordionStyledJsx";
import ts from "./templates/AccordionStyledTsx";
import { Accordion } from "./AccordionStyled.component";

import "./AccordionStyled.css";

export default {
  component: Accordion,
  title: "Accordion/Styled",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
  argTypes: createControls({
    ignore: [
      "selectedId",
      "wrap",
      "baseId",
      "unstable_virtual",
      "rtl",
      "orientation",
      "currentId",
      "shift",
      "unstable_includesBaseElement",
      "onSelectedIdChange",
      "shouldUpdate",
    ],
  }),
} as Meta;

export const Default: Story = args => <Accordion {...args} />;

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { defaultSelectedId: "accordion2" };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };

export const AllowToggle = Default.bind({});
AllowToggle.args = { allowToggle: true };
