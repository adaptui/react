import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/ProgressBasicCss";
import js from "./templates/ProgressBasicJsx";
import ts from "./templates/ProgressBasicTsx";
import { ProgressBasic } from "./ProgressBasic.component";

import "./ProgressBasic.css";

type Meta = ComponentMeta<typeof ProgressBasic>;
type Story = ComponentStoryObj<typeof ProgressBasic>;

export default {
  title: "Progress/Basic",
  component: ProgressBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story = { args: { value: 50 } };

export const IsIndeterminate = { args: { value: null } };
