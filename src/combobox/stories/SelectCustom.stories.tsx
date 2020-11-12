import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  selectCustomTemplate,
  selectCustomTemplateJs,
  selectCssTemplate,
} from "./templates";
import { App as SelectCustom } from "./SelectCustom.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectCustom,
  title: "Combobox/SelectCustom",
  parameters: {
    preview: createPreviewTabs({
      js: selectCustomTemplateJs,
      ts: selectCustomTemplate,
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
