import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/AccordionMultiJsx";
import ts from "./templates/AccordionMultiTsx";
import Accordion from "./AccordionMulti.component";

export default {
  component: Accordion,
  title: "Accordion/Multi",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
  argTypes: createControls({
    ignore: [
      "selectedIds",
      "wrap",
      "baseId",
      "unstable_virtual",
      "rtl",
      "orientation",
      "currentId",
      "shift",
      "unstable_includesBaseElement",
      "onSelectedIdsChange",
      "shouldUpdate",
    ],
  }),
} as Meta;

export const Default: Story = args => <Accordion {...args} />;

export const DefaultSelected = Default.bind({});
DefaultSelected.args = { defaultSelectedIds: ["accordion3", "accordion4"] };

export const AutoSelect = Default.bind({});
AutoSelect.args = { manual: false };

export const Loop = Default.bind({});
Loop.args = { loop: true };
