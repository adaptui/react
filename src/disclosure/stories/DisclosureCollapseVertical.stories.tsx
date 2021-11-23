import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DisclosureState } from "../index";

import js from "./templates/DisclosureCollapseVerticalJsx";
import ts from "./templates/DisclosureCollapseVerticalTsx";
import {
  DisclosureCollapseVertical,
  DisclosureCollapseVerticalProps,
} from "./DisclosureCollapseVertical.component";

export default {
  component: DisclosureCollapseVertical,
  title: "Disclosure/CollapseVertical",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story<DisclosureCollapseVerticalProps> = args => (
  <DisclosureCollapseVertical {...args} />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<DisclosureState["visible"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return (
    <DisclosureCollapseVertical visible={value} onVisibleChange={setValue} />
  );
};
