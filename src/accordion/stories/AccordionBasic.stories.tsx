import * as React from "react";
import { Meta, Story } from "@storybook/react";

import js from "./templates/AccordionBasicJsx";
import ts from "./templates/AccordionBasicTsx";
import Accordion from "./AccordionBasic.component";
import { createControls, createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Accordion,
  title: "Accordion/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
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
DefaultSelected.args = { defaultSelectedId: "accordion3" };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };

export const AllowToggle = Default.bind({});
AllowToggle.args = { allowToggle: true };
