import * as React from "react";
import { Meta, Story } from "@storybook/react";

import { createPreviewTabs } from "../../../.storybook/utils";
import { DialogState } from "../DialogState";

import css from "./templates/DialogBasicCss";
import js from "./templates/DialogBasicJsx";
import ts from "./templates/DialogBasicTsx";
import { DialogBasic, DialogBasicProps } from "./DialogBasic.component";

import "./DialogBasic.css";

export default {
  component: DialogBasic,
  title: "Dialog/Basic",
  parameters: {
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts, css }),
  },
} as Meta;

export const Default: Story<DialogBasicProps> = args => (
  <DialogBasic {...args} />
);

export const Controlled = () => {
  const [value, setValue] = React.useState<DialogState["visible"]>(false);
  console.log("%cvalue", "color: #997326", value);

  return <DialogBasic visible={value} onVisibleChange={setValue} />;
};
