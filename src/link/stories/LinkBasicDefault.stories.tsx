import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import js from "./templates/LinkBasicJsx";
import ts from "./templates/LinkBasicTsx";
import { LinkBasic } from "./LinkBasic.component";

type Meta = ComponentMeta<typeof LinkBasic>;
type Story = ComponentStoryObj<typeof LinkBasic>;

export default {
  title: "Link/Basic",
  component: LinkBasic,
} as Meta;

export const Default: Story = {
  args: {
    href: "https://timeless.co/",
    children: "Timeless",
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            href: "https://timeless.co/",
            children: "Timeless",
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({
            href: "https://timeless.co/",
            children: "Timeless",
          }),
        },
      },
    }),
  },
};

export const ExternlaLink: Story = {
  args: {
    children: "Timeless",
    href: "https://timeless.co/",
    isExternal: true,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            href: "https://timeless.co/",
            children: "Timeless",
            isExternal: true,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({
            href: "https://timeless.co/",
            children: "Timeless",
            isExternal: true,
          }),
        },
      },
    }),
  },
};

export const DisabledExternalLink: Story = {
  args: {
    children: "Timeless",
    href: "https://timeless.co/",
    isExternal: true,
    disabled: true,
  },
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            href: "https://timeless.co/",
            children: "Timeless",
            isExternal: true,
            disabled: true,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.tsx": CreateAppTemplate({
            href: "https://timeless.co/",
            children: "Timeless",
            isExternal: true,
            disabled: true,
          }),
        },
      },
    }),
  },
};
