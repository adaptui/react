import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DisclosureState } from "../DisclosureState";

import css from "./templates/DisclosureBasicCss";
import js from "./templates/DisclosureBasicJsx";
import ts from "./templates/DisclosureBasicTsx";
import { Disclosure, DisclosureProps } from "./DisclosureHorizontal.component";

import "./DisclosureHorizontal.css";

export default {
  component: Disclosure,
  title: "Disclosure/Horizontal",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story<DisclosureProps> = args => <Disclosure {...args} />;

export const Controlled = () => {
  const [value, setValue] = React.useState<DisclosureState["expanded"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return <Disclosure expanded={value} onExpandedChange={setValue} />;
};
