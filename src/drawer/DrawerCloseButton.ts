import { createHook, createComponent } from "reakit-system";
import {
  useButton,
  ButtonProps,
  useDialogDisclosure,
  DialogDisclosureOptions,
  DialogDisclosureHTMLProps,
} from "reakit";

import { DRAWER_CLOSE_BUTTON_KEYS } from "./__keys";

export type DrawerCloseButtonOptions = DialogDisclosureOptions;

export type DrawerCloseButtonHTMLProps = ButtonProps &
  DialogDisclosureHTMLProps;

export type DrawerCloseButtonProps = DrawerCloseButtonOptions &
  DrawerCloseButtonHTMLProps;

export const useDrawerCloseButton = createHook<
  DrawerCloseButtonOptions,
  DrawerCloseButtonHTMLProps
>({
  name: "DrawerCloseButton",
  compose: [useButton, useDialogDisclosure],
  keys: DRAWER_CLOSE_BUTTON_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DrawerCloseButton = createComponent({
  as: "button",
  useHook: useDrawerCloseButton,
});
