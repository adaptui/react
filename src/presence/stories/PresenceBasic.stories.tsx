import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/PresenceBasicJsx";
import ts from "./templates/PresenceBasicTsx";
import { PresenceBasic, PresenceBasicProps } from "./PresenceBasic.component";

export default {
  component: PresenceBasic,
  title: "Presence/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story<PresenceBasicProps> = args => (
  <PresenceBasic {...args} />
);
Default.args = {};
