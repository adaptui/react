import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  selectMultipleTemplate,
  selectMultipleTemplateJs,
  selectCssTemplate,
} from "./templates";
import { App as SelectMultiple } from "./SelectMultiple.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectMultiple,
  title: "Select/SelectMultiple",
  parameters: {
    preview: createPreviewTabs({
      js: selectMultipleTemplateJs,
      ts: selectMultipleTemplate,
      css: selectCssTemplate,
    }),
  },
  decorators: [
    Story => {
      document.body.id = "select";
      return <Story />;
    },
  ],
} as Meta;

const Base: Story = args => <SelectMultiple {...args} />;

export const Default = Base.bind({});
Default.args = {};
