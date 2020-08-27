import React from "react";
import { Meta } from "@storybook/react";

import { Input, useInput } from "../index";

export default {
  title: "Component/Input",
  component: Input,
} as Meta;

export function Component() {
  return <Input placeholder="input" />;
}
