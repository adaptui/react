import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/BreadcrumbsBasicCss";
import js from "./templates/BreadcrumbsBasicJsx";
import ts from "./templates/BreadcrumbsBasicTsx";
import Breadcrumbs from "./BreadcrumbsBasic.component";

import "./BreadcrumbsBasic.css";

export default {
  component: Breadcrumbs,
  title: "Breadcrumbs/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts, css }),
    options: { showPanel: false },
  },
} as Meta;

export const Default: Story = args => <Breadcrumbs {...args} />;
