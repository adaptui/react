import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SelectBasic.css";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import js from "./templates/SelectCustomJsx";
import ts from "./templates/SelectCustomTsx";
import css from "./templates/SelectBasicCss";
import Select from "./SelectCustom.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Select,
  title: "Select/Custom",
  parameters: {
    parameters: {
      preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
      options: { showPanel: true },
    },
  },
  decorators: [
    Story => {
      document.body.id = "select-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <Select {...args} />;
