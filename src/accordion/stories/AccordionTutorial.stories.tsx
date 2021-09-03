import * as React from "react";
import { Meta, Story } from "@storybook/react";

import js from "./templates/AccordionZAutoJsx";
import ts from "./templates/AccordionZAutoTsx";
import Accordion from "./AccordionTutorial.component";
import { createControls, createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Accordion,
  title: "Accordion/zAuto",
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
