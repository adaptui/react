import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SelectBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import css from "./templates/SelectBasicCss";
import js from "./templates/SelectControlledJsx";
import ts from "./templates/SelectControlledTsx";
import Select from "./SelectControlled.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Select,
  title: "Select/Controlled",
  parameters: { preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }) },
  decorators: [
    Story => {
      document.body.id = "select-basic";
      return <Story />;
    },
  ],
  options: { showPanel: false },
} as Meta;

export const Default: Story = args => <Select {...args} />;
