import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";
import { RadioState } from "../RadioState";

import js from "./templates/RadioBasicJsx";
import ts from "./templates/RadioBasicTsx";
import { Radio, RadioProps } from "./RadioBasic.component";

export default {
  component: Radio,
  title: "Radio/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
  argTypes: createControls({
    ignore: [
      "unstable_system",
      "unstable_clickOnEnter",
      "unstable_clickOnSpace",
      "wrapElement",
      "focusable",
      "as",
      "checked",
      "state",
      "setState",
      "onStateChange",
      "value",
    ],
  }),
} as Meta;

export const Default: Story<RadioProps> = args => <Radio {...args} />;

export const Controlled = () => {
  const [value, setValue] = React.useState<RadioState["state"]>("orange");

  return <Radio state={value} onStateChange={setValue} />;
};