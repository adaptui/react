import { createComponent, createHook } from "reakit-system";

import {
  DialogBackdropHTMLProps,
  DialogBackdropOptions,
  useDialogBackdrop,
} from "../dialog";

import { DRAWER_BACKDROP_KEYS } from "./__keys";

export type DrawerBackdropOptions = DialogBackdropOptions;

export type DrawerBackdropHTMLProps = DialogBackdropHTMLProps;

export type DrawerBackdropProps = DrawerBackdropOptions &
  DrawerBackdropHTMLProps;

export const useDrawerBackdrop = createHook<
  DrawerBackdropOptions,
  DrawerBackdropHTMLProps
>({
  name: "DrawerBackdrop",
  compose: useDialogBackdrop,
  keys: DRAWER_BACKDROP_KEYS,

  useOptions({ modal = false, ...options }) {
    return { modal, ...options };
  },
});

export const DrawerBackdrop = createComponent({
  as: "div",
  memo: true,
  useHook: useDrawerBackdrop,
});
