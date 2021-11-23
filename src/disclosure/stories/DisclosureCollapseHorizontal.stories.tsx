import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DisclosureState } from "../index";

import js from "./templates/DisclosureCollapseHorizontalJsx";
import ts from "./templates/DisclosureCollapseHorizontalTsx";
import {
  DisclosureCollapseHorizontal,
  DisclosureCollapseHorizontalProps,
} from "./DisclosureCollapseHorizontal.component";

export default {
  component: DisclosureCollapseHorizontal,
  title: "Disclosure/CollapseHorizontal",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story<DisclosureCollapseHorizontalProps> = args => (
  <DisclosureCollapseHorizontal {...args} />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<DisclosureState["visible"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return (
    <DisclosureCollapseHorizontal visible={value} onVisibleChange={setValue} />
  );
};
