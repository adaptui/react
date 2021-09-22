import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SelectBasicCss";
import js from "./templates/SelectFetchJsx";
import ts from "./templates/SelectFetchTsx";
import jsUtils from "./templates/UtilsJsx";
import tsUtils from "./templates/UtilsTsx";
import Select from "./SelectFetch.component";

import "./SelectBasic.css";

export default {
  component: Select,
  title: "Select/Fetch",
  parameters: {
    preview: createPreviewTabs({ js, ts, css, jsUtils, tsUtils }),
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "select-basic";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <Select {...args} />;
