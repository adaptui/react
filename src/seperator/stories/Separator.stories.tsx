import React from "react";
import { Meta } from "@storybook/react";

import { Separator, useSeparator } from "../index";

export default {
  title: "Component/Separator",
  component: Separator,
} as Meta;

export function Component() {
  return <Separator orientation="horizontal" />;
}
