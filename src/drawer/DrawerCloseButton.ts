import {
  useDialogDisclosure,
  DialogDisclosureOptions,
  DialogDisclosureHTMLProps,
} from "reakit";
import { createHook, createComponent } from "reakit-system";

import { DRAWER_CLOSE_BUTTON_KEYS } from "./__keys";

export type DrawerCloseButtonOptions = DialogDisclosureOptions;

export type DrawerCloseButtonHTMLProps = DialogDisclosureHTMLProps;

export type DrawerCloseButtonProps = DrawerCloseButtonOptions &
  DrawerCloseButtonHTMLProps;

export const useDrawerCloseButton = createHook<
  DrawerCloseButtonOptions,
  DrawerCloseButtonHTMLProps
>({
  name: "DrawerCloseButton",
  compose: useDialogDisclosure,
  keys: DRAWER_CLOSE_BUTTON_KEYS,
});

export const DrawerCloseButton = createComponent({
  as: "button",
  useHook: useDrawerCloseButton,
});
