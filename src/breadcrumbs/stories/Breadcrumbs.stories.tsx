import * as React from "react";
import { Meta, Story } from "@storybook/react";

import "./Breadcrumbs.css";
import { App as Breadcrumbs } from "./Breadcrumbs.component";
import {
  breadcrumbsTemplate,
  breadcrumbsTemplateJs,
  breadcrumbsCssTemplate,
} from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Breadcrumbs,
  title: "Breadcrumbs",
  parameters: {
    preview: createPreviewTabs({
      js: breadcrumbsTemplateJs,
      ts: breadcrumbsTemplate,
      css: breadcrumbsCssTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Breadcrumbs {...args} />;

export const Default = Base.bind({});
