import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { paginationTemplate, paginationTemplateJs } from "./templates";
import { App as Pagination } from "./Pagination.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Pagination,
  title: "Pagination",
  parameters: {
    preview: createPreviewTabs({
      js: paginationTemplateJs,
      ts: paginationTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Pagination {...args} />;

export const Default = Base.bind({});

export const DefaultPage = Base.bind({});
DefaultPage.args = {
  defaultPage: 5,
  count: 10,
};

export const BoundaryCount = Base.bind({});
BoundaryCount.args = {
  defaultPage: 25,
  count: 50,
  boundaryCount: 5,
};

export const SibilingCount = Base.bind({});
SibilingCount.args = {
  defaultPage: 25,
  count: 50,
  sibilingCount: 5,
};
