import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { App as Drawer } from "./Drawer.component";
import { drawerTemplate, drawerTemplateJs } from "./templates";
import { createPreviewTabs } from "../../../.storybook/utils";

export default {
  title: "Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: drawerTemplateJs,
      ts: drawerTemplate,
      deps: ["@emotion/css@latest"],
    }),
  },
} as Meta;

const Base: Story = args => <Drawer {...args} />;

export const Default = Base.bind({});
