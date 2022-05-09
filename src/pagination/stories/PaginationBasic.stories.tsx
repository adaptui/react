import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

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
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = {
  args: {},
};

export const DefaultPage = {
  args: {
    defaultPage: 5,
    count: 10,
  },
};

export const BoundaryCount = {
  args: {
    defaultPage: 25,
    count: 50,
    boundaryCount: 5,
  },
};

export const SibilingCount = {
  args: {
    defaultPage: 25,
    count: 50,
    sibilingCount: 5,
  },
};
