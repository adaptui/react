import { createHook, createComponent } from "reakit-system";
import {
  Dialog,
  useDialog,
  DialogBackdrop,
  useDialogState,
  DialogDisclosure,
  DialogOptions,
  DialogHTMLProps,
  DialogStateReturn,
  ButtonProps,
} from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";
import { DIALOG_KEYS } from "./__keys";

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
  keys: [...DIALOG_KEYS, "placement"],
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

export const useDrawerCloseButton = createHook<
  Pick<DialogStateReturn, "hide">,
  ButtonProps
>({
  name: "DrawerCloseButton",
  keys: [...DIALOG_KEYS, "hide"],

  useProps({ hide }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      onClick: callAllHandlers(hide, htmlOnClick),
      ...htmlProps,
    };
  },
});

export const DrawerCloseButton = createComponent({
  as: "button",
  useHook: useDrawerCloseButton,
});

export const useDrawerState = useDialogState;
export const DrawerBackdrop = DialogBackdrop;
export const DrawerDisclosure = DialogDisclosure;
