import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import {
  CreateAppTemplate,
  createPreviewTabs,
} from "../../../.storybook/utils";

import js from "./templates/PaginationBasicJsx";
import ts from "./templates/PaginationBasicTsx";
import { PaginationBasic } from "./PaginationBasic.component";

type Meta = ComponentMeta<typeof PaginationBasic>;
type Story = ComponentStoryObj<typeof PaginationBasic>;

export default {
  title: "Pagination/Basic",
  component: PaginationBasic,
  parameters: {
    layout: "centered",
  },
} as Meta;

export const Default: Story = {
  args: {},
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
};

export const DefaultPage = {
  args: {
    defaultPage: 5,
    count: 10,
  },
  parameters: {
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({ defaultPage: 5, count: 10 }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.ts": CreateAppTemplate({ defaultPage: 5, count: 10 }),
        },
      },
    }),
  },
};

export const BoundaryCount = {
  args: {
    defaultPage: 25,
    count: 50,
    boundaryCount: 5,
  },
  parameters: {
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            defaultPage: 25,
            count: 50,
            boundaryCount: 5,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.ts": CreateAppTemplate({
            defaultPage: 25,
            count: 50,
            boundaryCount: 5,
          }),
        },
      },
    }),
  },
};

export const SibilingCount = {
  args: {
    defaultPage: 25,
    count: 50,
    sibilingCount: 5,
  },
  parameters: {
    preview: createPreviewTabs({
      js: {
        template: js,
        files: {
          "src/App.js": CreateAppTemplate({
            defaultPage: 25,
            count: 50,
            sibilingCount: 5,
          }),
        },
      },
      ts: {
        template: ts,
        files: {
          "src/App.ts": CreateAppTemplate({
            defaultPage: 25,
            count: 50,
            sibilingCount: 5,
          }),
        },
      },
    }),
  },
};
