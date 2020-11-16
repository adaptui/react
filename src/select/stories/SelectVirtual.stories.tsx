import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Select.css";
import {
  selectVirtualTemplate,
  selectVirtualTemplateJs,
  selectCssTemplate,
} from "./templates";
import { App as SelectVirtual } from "./SelectVirtual.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: SelectVirtual,
  title: "Select/SelectVirtual",
  parameters: {
    preview: createPreviewTabs({
      js: selectVirtualTemplateJs,
      ts: selectVirtualTemplate,
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

const Base: Story = args => <SelectVirtual {...args} />;

// export const Default = Base.bind({});
// Default.args = {};
