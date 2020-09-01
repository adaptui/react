import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "reakit";

import { Group, useGroup } from "../index";

export default {
  title: "Component/Group",
  component: Group,
} as Meta;

export function Component() {
  return (
    <Group>
      <Button>Button1</Button>
      <Button>Button2</Button>
      <Button>Button3</Button>
    </Group>
  );
}
