import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DisclosureState } from "../DisclosureState";

import js from "./templates/DisclosureBasicJsx";
import ts from "./templates/DisclosureBasicTsx";
import { Disclosure, DisclosureProps } from "./DisclosureBasic.component";

export default {
  component: Disclosure,
  title: "Disclosure/Basic",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story<DisclosureProps> = args => (
  <Disclosure duration={1} {...args} />
);

export const WithTransition: Story<DisclosureProps> = args => (
  <Disclosure {...args} />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<DisclosureState["expanded"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return <Disclosure expanded={value} onExpandedChange={setValue} />;
};
