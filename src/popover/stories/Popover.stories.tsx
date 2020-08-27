import React from "react";
import { Meta } from "@storybook/react";

import {
  usePopoverState,
  Popover,
  usePopover,
  PopoverDisclosure,
  usePopoverDisclosure,
  PopoverArrow,
  usePopoverArrow,
  PopoverBackdrop,
  usePopoverBackdrop,
} from "../index";
import { Button } from "../../button";

export default {
  title: "Component/Popover",
  component: Popover,
} as Meta;

export function Component() {
  const popover = usePopoverState();
  return (
    <>
      <PopoverDisclosure {...popover}>Open Popover</PopoverDisclosure>
      <Popover {...popover} aria-label="Welcome">
        <PopoverArrow {...popover} />
        Welcome to Reakit!
      </Popover>
    </>
  );
}

export function Placement() {
  const popover = usePopoverState({ placement: "right-start" });
  return (
    <>
      <PopoverDisclosure {...popover}>Open Popover</PopoverDisclosure>
      <Popover {...popover} aria-label="Welcome">
        <PopoverArrow {...popover} />
        Welcome to Reakit!
      </Popover>
    </>
  );
}

export function Gutter() {
  const popover = usePopoverState({ gutter: 0, placement: "bottom-start" });
  return (
    <>
      <PopoverDisclosure {...popover}>Open Popover</PopoverDisclosure>
      <Popover {...popover} aria-label="Welcome">
        Welcome to Reakit!
      </Popover>
    </>
  );
}

export function InitialFocus() {
  const popover = usePopoverState();
  return (
    <>
      <PopoverDisclosure {...popover}>Open Popover</PopoverDisclosure>
      <Popover {...popover} tabIndex={0} aria-label="Welcome">
        <Button onClick={popover.hide}>Close</Button>
      </Popover>
    </>
  );
}

export function AlternateInitialFocus() {
  const popover = usePopoverState();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (popover.visible) {
      ref.current.focus();
    }
  }, [popover.visible]);

  return (
    <>
      <PopoverDisclosure {...popover}>Open Popover</PopoverDisclosure>
      <Popover {...popover} aria-label="Welcome">
        <Button>By default, initial focus would go here</Button>
        <br />
        <br />
        <Button ref={ref}>But now it goes here</Button>
      </Popover>
    </>
  );
}
