import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  selectDynamicTemplate,
  selectDynamicTemplateJs,
  selectCssTemplate,
} from "./templates";
import { App as SelectDynamic } from "./SelectDynamic.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectDynamic,
  title: "Select/SelectDynamic",
  parameters: {
    preview: createPreviewTabs({
      js: selectDynamicTemplateJs,
      ts: selectDynamicTemplate,
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

const Base: Story = args => <SelectDynamic {...args} />;

export const Default = Base.bind({});
Default.args = {};
