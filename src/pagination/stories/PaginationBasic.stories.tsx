import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/PaginationBasicJsx";
import ts from "./templates/PaginationBasicTsx";
import { Pagination } from "./PaginationBasic.component";

export default {
  component: Pagination,
  title: "Pagination/Basic",
  parameters: {
    layout: "centered",
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = args => <Pagination {...args} />;

export const DefaultPage = Default.bind({});
DefaultPage.args = {
  defaultPage: 5,
  count: 10,
};

export const BoundaryCount = Default.bind({});
BoundaryCount.args = {
  defaultPage: 25,
  count: 50,
  boundaryCount: 5,
};

export const SibilingCount = Default.bind({});
SibilingCount.args = {
  defaultPage: 25,
  count: 50,
  sibilingCount: 5,
};
