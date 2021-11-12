import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DisclosureState } from "../index";

import css from "./templates/DisclosureBasicCss";
import js from "./templates/DisclosureBasicJsx";
import ts from "./templates/DisclosureBasicTsx";
import {
  DisclosureBasic,
  DisclosureBasicProps,
} from "./DisclosureBasic.component";

import "./DisclosureBasic.css";

export default {
  component: DisclosureBasic,
  title: "Disclosure/Basic",
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story<DisclosureBasicProps> = args => (
  <DisclosureBasic {...args} />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<DisclosureState["expanded"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return <DisclosureBasic expanded={value} onExpandedChange={setValue} />;
};
