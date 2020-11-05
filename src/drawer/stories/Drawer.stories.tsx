import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Drawer } from "./Drawer.component";
import { drawerTemplate, drawerTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  title: "Drawer",
  component: Drawer,
  parameters: {
    preview: createPreviewTabs({
      js: drawerTemplateJs,
      ts: drawerTemplate,
      deps: ["emotion@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <Drawer {...args} />;

export const Default = Base.bind({});
