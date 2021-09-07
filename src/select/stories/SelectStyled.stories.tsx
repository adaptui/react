import * as React from "react";
import { Meta, Story } from "@storybook/react";

import Select from "./SelectStyled.component";
import js from "./templates/SelectStyledJsx";
import ts from "./templates/SelectStyledTsx";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  component: Select,
  title: "Select/Styled",
  parameters: {
    preview: createPreviewTabs({ js, ts }),
    options: { showPanel: true },
  },
  decorators: [
    Story => {
      document.body.id = "tailwind";
      return <Story />;
    },
  ],
} as Meta;

export const Default: Story = args => <Select {...args} />;
Default.args = {};
