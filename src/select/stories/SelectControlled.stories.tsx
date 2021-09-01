import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  utilsTemplate,
  utilsTemplateJs,
  selectCssTemplate,
  selectControlledTemplate,
  selectControlledTemplateJs,
} from "./templates";
import { App as SelectControlled } from "./SelectControlled.component";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: SelectControlled,
  title: "Select/Controlled",
  parameters: {
    preview: createPreviewTabs({
      js: selectControlledTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: selectControlledTemplate,
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

const Base: Story = args => <SelectControlled {...args} />;

export const Default = Base.bind({});
Default.args = {};
