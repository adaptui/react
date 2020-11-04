import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { appTemplate, appTemplateJs } from "./templates";
import { App as Pagination } from "./Pagination.component";
import { createPreviewTabs } from "../../../scripts/create-preview-tabs";

export default {
  component: Pagination,
  title: "Pagination",
  parameters: {
    preview: createPreviewTabs({
      js: appTemplateJs,
      ts: appTemplate,
    }),
  },
} as Meta;

const Base: Story = args => <Pagination {...args} />;

export const Default = Base.bind({});

export const DefaultPage = Base.bind({});
DefaultPage.args = {
  defaultPage: 5,
};

export const BoundaryCount = Base.bind({});
BoundaryCount.args = {
  count: 50,
  boundaryCount: 5,
  defaultPage: 25,
};

export const SibilingCount = Base.bind({});
SibilingCount.args = {
  count: 50,
  sibilingCount: 5,
  defaultPage: 25,
};
