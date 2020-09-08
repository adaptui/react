import React from "react";
import { css } from "emotion";
import { Meta } from "@storybook/react";
import {
  Drawer,
  TPlacement,
  useDrawerState,
  DrawerBackdrop,
  DrawerCloseButton,
  DrawerDisclosure,
} from "../";

export default {
  title: "Component/Drawer",
} as Meta;

const backdropStyles = css`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 250ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.2);
  &[data-enter] {
    opacity: 1;
  }
`;

const drawerContentStyles = css`
  opacity: 0;
  padding: 10px;
  background-color: white;
  transition: 250ms ease-in-out;
  &[data-enter] {
    opacity: 1;
  }
`;

export const Default = () => {
  const dialog = useDrawerState({ animated: true });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [placement, setPlacement] = React.useState<TPlacement>("left");

  return (
    <div>
      <DrawerDisclosure {...dialog}>Open Drawer</DrawerDisclosure>
      <select onBlur={e => setPlacement(e.target.value as TPlacement)}>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="right">Right</option>
        <option value="left">Left</option>
      </select>
      <DrawerBackdrop className={backdropStyles} {...dialog}>
        <Drawer
          {...dialog}
          placement={placement}
          aria-label="Hello world"
          className={drawerContentStyles}
          unstable_initialFocusRef={inputRef}
        >
          <DrawerCloseButton {...dialog}>X</DrawerCloseButton>
          <p>Welcome to Reakit!</p>
          <input ref={inputRef} />
        </Drawer>
      </DrawerBackdrop>
    </div>
  );
};
