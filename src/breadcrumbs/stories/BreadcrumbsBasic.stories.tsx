import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import css from "./templates/BreadcrumbsBasicCss";
import js from "./templates/BreadcrumbsBasicJsx";
import ts from "./templates/BreadcrumbsBasicTsx";
import { BreadcrumbsBasic } from "./BreadcrumbsBasic.component";

type Meta = ComponentMeta<typeof BreadcrumbsBasic>;
type Story = ComponentStoryObj<typeof BreadcrumbsBasic>;

export default {
  title: "Breadcrumbs/Basic",
  component: BreadcrumbsBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: { "src/components/BreadcrumbsBasic.css": css },
      },
      ts: {
        template: ts,
        files: { "src/components/BreadcrumbsBasic.css": css },
      },
    }),
  },
} as Meta;

export const Default: Story = {};
