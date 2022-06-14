import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/LinkBasicJsx";
import ts from "./templates/LinkBasicTsx";
import { LinkBasic } from "./LinkBasic.component";

type Meta = ComponentMeta<typeof LinkBasic>;
type Story = ComponentStoryObj<typeof LinkBasic>;

export default {
  title: "Link/Basic",
  component: LinkBasic,
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
      },
      ts: {
        template: ts,
      },
    }),
  },
} as Meta;

export const ExternlaLink: Story = {
  parameters: {
    preview: createPreviewTabs({
      js: {
        template: js,
      },
      ts: {
        template: ts,
      },
    }),
  },
  args: {
    children: "Timeless",
    href: "https://timeless.co/",
    isExternal: true,
  },
};
