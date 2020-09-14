import React from "react";
import { Meta, Story } from "@storybook/react";

import { ReakitButton, ButtonProps } from "./Buttons";

export default {
  title: "Component/Buttons/ReakitButton",
  component: ReakitButton,
} as Meta;

const Template: Story<ButtonProps> = args => <ReakitButton {...args} />;

export const Default = Template.bind({});

export const LinkButton = Template.bind({});
LinkButton.args = {
  as: "a",
  href: "https://reakit.io/docs/button/",
  target: "_blank",
  rel: "noreferrer noopener",
};

export const SpanButton = Template.bind({});
SpanButton.args = {
  as: "span",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  focusable: false,
};

export const Focusable = Template.bind({});
Focusable.args = {
  disabled: true,
  focusable: true,
};
