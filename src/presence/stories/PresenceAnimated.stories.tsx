import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/PresenceAnimatedCss";
import js from "./templates/PresenceAnimatedJsx";
import ts from "./templates/PresenceAnimatedTsx";
import {
  PresenceAnimated,
  PresenceAnimatedProps,
} from "./PresenceAnimated.component";

import "./PresenceAnimated.css";

export default {
  component: PresenceAnimated,
  title: "Presence/Animated",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story<PresenceAnimatedProps> = args => (
  <PresenceAnimated {...args} />
);
Default.args = {};
