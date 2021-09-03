import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./SelectBasic.css";
import js from "./templates/SelectBasicJsx";
import ts from "./templates/SelectBasicTsx";
import css from "./templates/SelectBasicCss";
import Select from "./SelectBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Select,
  title: "Select/Basic",
  parameters: { preview: createPreviewTabs({ js, ts, css }) },
} as Meta;

export const Default: Story = args => <Select {...args} />;
