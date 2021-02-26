import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Select } from "./SelectStyled.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";
import { selectStyledTemplate, selectStyledTemplateJs } from "./templates";

export default {
  component: Select,
  title: "Select/Styled",
  parameters: {
    preview: createPreviewTabs({
      js: selectStyledTemplateJs,
      ts: selectStyledTemplate,
    }),
  },
  decorators: [
    Story => {
      document.body.id = "tailwind";
      return <Story />;
    },
  ],
} as Meta;

const Base: Story = args => <Select {...args} />;

export const Default = Base.bind({});
Default.args = {};
