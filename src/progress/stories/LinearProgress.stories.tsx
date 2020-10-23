import React from "react";
import { Meta, Story } from "@storybook/react";

import {
  LinearProgress as Progress,
  LinearProgressInitialState,
} from "./LinearProgress";

export default {
  component: Progress,
  title: "Progress/Linear",
} as Meta;

const Base: Story<LinearProgressInitialState> = args => <Progress {...args} />;

export const Default = Base.bind({});

export const WithLabel = Base.bind({});
WithLabel.args = { withLabel: true };

export const WithStripe = Base.bind({});
WithStripe.args = { withStripe: true };

export const WithStripeAnimation = Base.bind({});
WithStripeAnimation.args = {
  withStripe: true,
  withStripeAnimation: true,
};

export const IsIndeterminate = Base.bind({});
IsIndeterminate.args = { value: null };
