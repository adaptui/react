import { CSSProperties } from "react";
import { DialogOptions, useDialog } from "ariakit/dialog";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

export const useDrawer = createHook<DrawerOptions>(
  ({ placement = "left", state, ...props }) => {
    const style: CSSProperties = {
      ...PLACEMENTS[placement],
      position: "fixed",
      ...props.style,
    };

    props = { ...props, style };
    props = useDialog({ state, ...props });

    return props;
  },
);

export const Drawer = createComponent<DrawerOptions>(props => {
  const htmlProps = useDrawer(props);

  return createElement("div", htmlProps);
});

export type DrawerOptions<T extends As = "div"> = DialogOptions<T> & {
  /**
   * Direction to place the drawer.
   *
   * @default left
   */
  placement?: Placement;
};

export type DrawerProps<T extends As = "div"> = Props<DrawerOptions<T>>;

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
