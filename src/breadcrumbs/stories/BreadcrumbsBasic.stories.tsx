import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/BreadcrumbsBasicJsx";
import ts from "./templates/BreadcrumbsBasicTsx";
import { BreadcrumbsBasic } from "./BreadcrumbsBasic.component";

import "./BreadcrumbsBasic.css";

type Meta = ComponentMeta<typeof BreadcrumbsBasic>;
type Story = ComponentStoryObj<typeof BreadcrumbsBasic>;

export default {
  title: "Breadcrumbs/Basic",
  component: BreadcrumbsBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = {};
