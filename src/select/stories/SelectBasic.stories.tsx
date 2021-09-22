import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/SelectBasicCss";
import js from "./templates/SelectBasicJsx";
import ts from "./templates/SelectBasicTsx";
import Select from "./SelectBasic.component";

import "./SelectBasic.css";

export default {
  component: Select,
  title: "Select/Basic",
  parameters: {
    preview: createPreviewTabs({ js, ts, css }),
    options: { showPanel: true },
  },
} as Meta;

export const Default: Story = args => <Select {...args} />;
