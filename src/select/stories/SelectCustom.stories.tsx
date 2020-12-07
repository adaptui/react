import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  utilsTemplate,
  utilsTemplateJs,
  selectCssTemplate,
  selectCustomTemplate,
  selectCustomTemplateJs,
} from "./templates";
import { App as SelectCustom } from "./SelectCustom.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectCustom,
  title: "Select/Custom",
  parameters: {
    preview: createPreviewTabs({
      js: selectCustomTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: selectCustomTemplate,
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

const Base: Story = args => <SelectCustom {...args} />;

export const Default = Base.bind({});
Default.args = {};
