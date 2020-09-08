import { createHook, createComponent } from "reakit-system";
import { Dialog, useDialog, DialogOptions, DialogHTMLProps } from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";
import { DRAWER_KEYS } from "./__keys";

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

export type TPlacement = keyof typeof PLACEMENTS;

const useDrawer = createHook<
  DialogOptions & { placement?: TPlacement },
  DialogHTMLProps
>({
  name: "Drawer",
  compose: [useDialog],
  keys: [...DRAWER_KEYS, "placement"],
  useProps({ placement = "left" }, { style: htmlStyles, ...htmlProps }) {
    return {
      style: {
        ...PLACEMENTS[placement],
        position: "fixed",
        htmlStyles,
      },
      ...htmlProps,
    };
  },
});

export const Drawer = createComponent({
  as: Dialog,
  useHook: useDrawer,
});
