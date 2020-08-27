import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "reakit";
import { useMenuState, MenuButton, Menu, MenuItem } from "reakit/Menu";

import {
  useToolbarState,
  Toolbar,
  useToolbar,
  ToolbarItem,
  useToolbarItem,
  ToolbarSeparator,
  useToolbarSeparator,
} from "../index";

export default {
  title: "Component/Toolbar",
  component: Toolbar,
} as Meta;

export function Component() {
  const toolbar = useToolbarState({ loop: true });
  return (
    <Toolbar {...toolbar} aria-label="My toolbar">
      <ToolbarItem {...toolbar} as={Button}>
        Item 1
      </ToolbarItem>
      <ToolbarItem {...toolbar} as={Button}>
        Item 2
      </ToolbarItem>
      <ToolbarSeparator {...toolbar} />
      <ToolbarItem {...toolbar} as={Button}>
        Item 3
      </ToolbarItem>
    </Toolbar>
  );
}

const MoreItems = React.forwardRef((props, ref) => {
  const menu = useMenuState({ placement: "bottom-end" });
  return (
    <>
      <MenuButton {...menu} {...props} ref={ref} aria-label="More items">
        Menu
      </MenuButton>
      <Menu {...menu} aria-label="More items">
        <MenuItem {...menu}>Item 3</MenuItem>
        <MenuItem {...menu}>Item 4</MenuItem>
        <MenuItem {...menu}>Item 5</MenuItem>
      </Menu>
    </>
  );
});

export function ToolbarWithMenu() {
  const toolbar = useToolbarState();
  return (
    <Toolbar {...toolbar} aria-label="My toolbar">
      <ToolbarItem {...toolbar} as={Button}>
        Item 1
      </ToolbarItem>
      <ToolbarItem {...toolbar} as={Button}>
        Item 2
      </ToolbarItem>
      <ToolbarItem {...toolbar} as={MoreItems} />
    </Toolbar>
  );
}
