import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  utilsTemplate,
  utilsTemplateJs,
  selectCssTemplate,
  selectDynamicTemplate,
  selectDynamicTemplateJs,
} from "./templates";
import { App as SelectDynamic } from "./SelectDynamic.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectDynamic,
  title: "Select/Dynamic",
  parameters: {
    preview: createPreviewTabs({
      js: selectDynamicTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: selectDynamicTemplate,
      tsUtils: utilsTemplate,
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
