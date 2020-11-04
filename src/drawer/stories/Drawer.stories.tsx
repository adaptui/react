import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Drawer } from "./Drawer.component";
import { appTemplate, appTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  title: "Drawer",
  component: Drawer,
  parameters: {
    preview: createPreviewTabs({
      js: appTemplateJs,
      ts: appTemplate,
      deps: ["emotion@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <Drawer {...args} />;

export const Default = Base.bind({});
