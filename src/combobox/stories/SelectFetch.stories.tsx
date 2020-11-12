import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  selectFetchTemplate,
  selectFetchTemplateJs,
  selectCssTemplate,
} from "./templates";
import { App as SelectFetch } from "./SelectFetch.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectFetch,
  title: "Combobox/SelectFetch",
  parameters: {
    preview: createPreviewTabs({
      js: selectFetchTemplateJs,
      ts: selectFetchTemplate,
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

const Base: Story = args => <SelectFetch {...args} />;

export const Default = Base.bind({});
Default.args = {};
