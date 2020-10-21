import React from "react";
import { Meta, Story } from "@storybook/react";

import {
  CircularProgress as Progress,
  CircularProgressInitialState,
} from "./CircularProgress";

export default {
  component: Progress,
  title: "Progress/Circular",
} as Meta;

const Base: Story<CircularProgressInitialState> = args => (
  <Progress {...args} />
);

export const Default = Base.bind({});

export const WithLabel = Base.bind({});
WithLabel.args = { withLabel: true };

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { isIndeterminate: true };
