import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "reakit";

import {
  Tooltip,
  useTooltip,
  TooltipArrow,
  useTooltipArrow,
  TooltipReference,
  useTooltipReference,
  useTooltipState,
} from "../index";

export default {
  title: "Component/Tooltip",
  component: Tooltip,
} as Meta;

export function Component() {
  const tooltip = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        Reference
      </TooltipReference>
      <Tooltip {...tooltip}>Tooltip</Tooltip>
    </>
  );
}

export function Placement() {
  const tooltip = useTooltipState({ placement: "bottom-end" });
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        Reference
      </TooltipReference>
      <Tooltip {...tooltip}>Tooltip</Tooltip>
    </>
  );
}

export function Multiple() {
  const tooltip1 = useTooltipState();
  const tooltip2 = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip1} as={Button}>
        Reference 1
      </TooltipReference>
      <Tooltip {...tooltip1}>Tooltip 1</Tooltip>
      <TooltipReference {...tooltip2} as={Button}>
        Reference 2
      </TooltipReference>
      <Tooltip {...tooltip2}>Tooltip 2</Tooltip>
    </>
  );
}
