import * as React from "react";
import { Meta, Story } from "@storybook/react";
import { DEFAULT_REACT_CODESANDBOX } from "storybook-addon-preview";

import { circularAppTemplate } from "./templates";
import { App as Progress } from "./CircularProgress.component";

export default {
  component: Progress,
  title: "ProgressCircular",
  parameters: {
    preview: [
      {
        tab: "React",
        template: circularAppTemplate,
        language: "tsx",
        copy: true,
        codesandbox: DEFAULT_REACT_CODESANDBOX([
          "renderless-components@alpha",
          "reakit",
          "emotion",
        ]),
      },
    ],
  },
} as Meta;

const Base: Story = args => <Progress {...args} />;

export const Default = Base.bind({});

export const WithLabel = Base.bind({});
WithLabel.args = { withLabel: true };

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { value: null };
