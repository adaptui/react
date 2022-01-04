import { createHook } from "reakit-system";

import { DialogHTMLProps, DialogOptions, useDialog } from "../dialog";
import { createComponent } from "../system";

import { DRAWER_KEYS } from "./__keys";

export type DrawerOptions = DialogOptions & {
  /**
   * Direction to place the drawer.
   *
   * @default left
   */
  placement: Placement;
};

export type DrawerHTMLProps = DialogHTMLProps;

export type DrawerProps = DrawerOptions & DrawerHTMLProps;

export const useDrawer = createHook<DrawerOptions, DrawerHTMLProps>({
  name: "Drawer",
  compose: useDialog,
  keys: DRAWER_KEYS,

  useOptions(options, htmlProps) {
    const { placement = "left" } = options;

    return {
      ...options,
      placement,
    };
  },

  useProps(options, htmlProps) {
    const { placement } = options;
    const { style: htmlStyles, ...restHtmlProps } = htmlProps;

    return {
      style: {
        ...PLACEMENTS[placement],
        position: "fixed",
        ...htmlStyles,
      },
      ...restHtmlProps,
    };
  },
});

export const Drawer = createComponent({
  as: "div",
  useHook: useDrawer,
});

export type Placement = keyof typeof PLACEMENTS;

const PLACEMENTS = {
  left: {
    left: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
  },
  top: {
    right: 0,
    left: 0,
    top: 0,
    width: "100vw",
  },
  bottom: {
    right: 0,
    left: 0,
    bottom: 0,
    width: "100vw",
  },
};
