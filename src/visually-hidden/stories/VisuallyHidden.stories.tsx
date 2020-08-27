import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "reakit/";

import { VisuallyHidden, useVisuallyHidden } from "../index";

export default {
  title: "Component/VisuallyHidden",
  component: VisuallyHidden,
} as Meta;

export function Component() {
  return (
    <Button>
      <VisuallyHidden>Universal Access</VisuallyHidden> VisuallyHidden
    </Button>
  );
}
