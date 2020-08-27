import React from "react";
import { Meta } from "@storybook/react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "../../dialog";
import { Button } from "../../button";

import {
  useMenuState,
  useMenuBarState,
  Menu,
  useMenu,
  MenuArrow,
  useMenuArrow,
  MenuButton,
  useMenuButton,
  MenuItem,
  useMenuItem,
  MenuSeparator,
  useMenuSeparator,
  MenuBar,
  useMenuBar,
  MenuGroup,
  useMenuGroup,
  MenuItemCheckbox,
  useMenuItemCheckbox,
  MenuItemRadio,
  useMenuItemRadio,
  MenuDisclosure,
  useMenuDisclosure,
} from "../index";

export default {
  title: "Component/Menu",
  component: Menu,
} as Meta;

export function Component() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu} disabled>
          Extensions
        </MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}

export function MenuActions() {
  const menu = useMenuState();

  return (
    <>
      <MenuButton {...menu}>Menu</MenuButton>
      <Menu {...menu} aria-label="Example">
        <MenuItem
          {...menu}
          onClick={() => {
            menu.hide();
            console.log("clicked on button");
          }}
        >
          Button
        </MenuItem>
        <MenuItem {...menu} as="a" href="#" onClick={menu.hide}>
          Link
        </MenuItem>
      </Menu>
    </>
  );
}

export function InitialFocus() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} tabIndex={0} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu}>Extensions</MenuItem>
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}

export function AlternativeInitialFocus() {
  const menu = useMenuState();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (menu.visible) {
      ref.current.focus();
    }
  }, [menu.visible]);

  return (
    <>
      <MenuButton {...menu}>Preferences</MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu} ref={ref}>
          Extensions
        </MenuItem>
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
}

const PreferencesMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        Preferences
      </MenuButton>
      <Menu {...menu} aria-label="Preferences">
        <MenuItem {...menu}>Settings</MenuItem>
        <MenuItem {...menu} disabled>
          Extensions
        </MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Keyboard shortcuts</MenuItem>
      </Menu>
    </>
  );
});

export function SubMenu() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Code</MenuButton>
      <Menu {...menu} aria-label="Code">
        <MenuItem {...menu}>About Visual Studio Code</MenuItem>
        <MenuItem {...menu}>Check for Updates...</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu} as={PreferencesMenu} />
      </Menu>
    </>
  );
}

const UpdatesDialog = React.forwardRef((props, ref) => {
  const dialog = useDialogState();
  return (
    <>
      <DialogDisclosure ref={ref} {...dialog} {...props}>
        Check for Updates...
      </DialogDisclosure>
      <Dialog {...dialog} aria-label="Check for Updates">
        <p>There are currently no updates available.</p>
        <Button onClick={dialog.hide}>OK</Button>
      </Dialog>
    </>
  );
});

export function MenuWithDialog() {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu}>Code</MenuButton>
      <Menu {...menu} aria-label="Code">
        <MenuItem {...menu}>About Visual Studio Code</MenuItem>
        <MenuItem {...menu} as={UpdatesDialog} />
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Preferences</MenuItem>
      </Menu>
    </>
  );
}

// OPEN RECENT
const OpenRecentMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        Open Recent
      </MenuButton>
      <Menu {...menu} aria-label="Open Recent">
        <MenuItem {...menu}>Reopen Closed Editor</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>More...</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Clear Recently Opened</MenuItem>
      </Menu>
    </>
  );
});

// FILE
const FileMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        File
      </MenuButton>
      <Menu {...menu} aria-label="File">
        <MenuItem {...menu}>New File</MenuItem>
        <MenuItem {...menu}>New Window</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Open...</MenuItem>
        <MenuItem {...menu}>Open Workspace...</MenuItem>
        <MenuItem {...menu} as={OpenRecentMenu} />
      </Menu>
    </>
  );
});

// EDIT
const EditMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        Edit
      </MenuButton>
      <Menu {...menu} aria-label="Edit">
        <MenuItem {...menu}>Undo</MenuItem>
        <MenuItem {...menu}>Redo</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu}>Cut</MenuItem>
        <MenuItem {...menu}>Copy</MenuItem>
        <MenuItem {...menu}>Paste</MenuItem>
      </Menu>
    </>
  );
});

// VIEW
const ViewMenu = React.forwardRef((props, ref) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton ref={ref} {...menu} {...props}>
        View
      </MenuButton>
      <Menu {...menu} aria-label="View">
        <MenuGroup {...menu}>
          <MenuItemRadio {...menu} name="windows" value="explorer">
            Explorer
          </MenuItemRadio>
          <MenuItemRadio {...menu} name="windows" value="search">
            Search
          </MenuItemRadio>
          <MenuItemRadio {...menu} name="windows" value="debug">
            Debug
          </MenuItemRadio>
          <MenuItemRadio {...menu} name="windows" value="extensions">
            Extensions
          </MenuItemRadio>
        </MenuGroup>
        <MenuSeparator {...menu} />
        <MenuItemCheckbox {...menu} name="toggles" value="word-wrap">
          Toggle Word Wrap
        </MenuItemCheckbox>
        <MenuItemCheckbox {...menu} name="toggles" value="minimap">
          Toggle Minimap
        </MenuItemCheckbox>
        <MenuItemCheckbox {...menu} name="toggles" value="breadcrumbs">
          Toggle Breadcrumbs
        </MenuItemCheckbox>
      </Menu>
    </>
  );
});

export function Menubar() {
  const menu = useMenuBarState();
  return (
    <MenuBar {...menu}>
      <MenuItem {...menu} as={FileMenu} />
      <MenuItem {...menu} as={EditMenu} />
      <MenuItem {...menu} as={ViewMenu} />
    </MenuBar>
  );
}
