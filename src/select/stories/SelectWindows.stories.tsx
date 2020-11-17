import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  utilsTemplate,
  utilsTemplateJs,
  selectCssTemplate,
  selectWindowsTemplate,
  selectWindowsTemplateJs,
} from "./templates";
import { App as SelectWindows } from "./SelectWindows.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectWindows,
  title: "Select/SelectWindows",
  parameters: {
    preview: createPreviewTabs({
      js: selectWindowsTemplateJs,
      jsUtils: utilsTemplateJs,
      ts: selectWindowsTemplate,
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

const Base: Story = args => <SelectWindows {...args} />;

export const Default = Base.bind({});
Default.args = {};
