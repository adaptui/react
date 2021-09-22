import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/AccordionTutorialJsx";
import ts from "./templates/AccordionTutorialTsx";
import Accordion from "./AccordionTutorial.component";

export default {
  component: Accordion,
  title: "Accordion/Tutorial",
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
