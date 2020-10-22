import React from "react";
import { Meta } from "@storybook/react";

import { StorySlider } from "./SliderComponent";

export default {
  title: "SliderNew",
} as Meta;

export const Default = () => <StorySlider showTip />;
