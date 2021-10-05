import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DisclosureState } from "../DisclosureState";

import js from "./templates/DisclosureBasicJsx";
import ts from "./templates/DisclosureBasicTsx";
import { Disclosure, DisclosureProps } from "./DisclosureHorizontal.component";

export default {
  component: Disclosure,
  title: "Disclosure/Horizontal",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story<DisclosureProps> = args => (
  <Disclosure direction="horizontal" duration={1} {...args} />
);

export const WithTransition: Story<DisclosureProps> = args => (
  <Disclosure direction="horizontal" {...args} />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<DisclosureState["expanded"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return (
    <Disclosure
      direction="horizontal"
      expanded={value}
      onExpandedChange={setValue}
    />
  );
};
