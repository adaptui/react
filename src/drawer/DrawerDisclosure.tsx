import { createComponent, createHook } from "reakit-system";

import {
  DialogDisclosureHTMLProps,
  DialogDisclosureOptions,
  useDialogDisclosure,
} from "../dialog";

import { DRAWER_DISCLOSURE_KEYS } from "./__keys";

export type DrawerDisclosureOptions = DialogDisclosureOptions & {};
export type DrawerDisclosureHTMLProps = DialogDisclosureHTMLProps;

export type DrawerDisclosureProps = DrawerDisclosureOptions &
  DrawerDisclosureHTMLProps;

export const useDrawerDisclosure = createHook<
  DrawerDisclosureOptions,
  DrawerDisclosureHTMLProps
>({
  name: "DrawerDisclosure",
  compose: useDialogDisclosure,
  keys: DRAWER_DISCLOSURE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DrawerDisclosure = createComponent({
  as: "button",
  memo: true,
  useHook: useDrawerDisclosure,
});
