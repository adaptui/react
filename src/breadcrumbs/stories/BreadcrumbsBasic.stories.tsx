import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./BreadcrumbsBasic.css";
import js from "./templates/BreadcrumbsBasicJsx";
import ts from "./templates/BreadcrumbsBasicTsx";
import css from "./templates/BreadcrumbsBasicCss";
import Breadcrumbs from "./BreadcrumbsBasic.component";
import { createPreviewTabs } from "../../../.storybook/utils";

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
