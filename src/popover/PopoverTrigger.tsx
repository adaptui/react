import { createComponent, createHook } from "reakit-system";

import {
  DialogDisclosureHTMLProps,
  DialogDisclosureOptions,
  useDialogDisclosure,
} from "../dialog";

import { POPOVER_DISCLOSURE_KEYS } from "./__keys";

export type PopoverTriggerOptions = DialogDisclosureOptions & {};

export type PopoverTriggerHTMLProps = DialogDisclosureHTMLProps;

export type PopoverTriggerProps = PopoverTriggerOptions &
  PopoverTriggerHTMLProps;

export const usePopoverTrigger = createHook<
  PopoverTriggerOptions,
  PopoverTriggerHTMLProps
>({
  name: "PopoverTrigger",
  compose: useDialogDisclosure,
  keys: POPOVER_DISCLOSURE_KEYS,

  useOptions(options, htmlProps) {
    return options;
  },

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const PopoverTrigger = createComponent({
  as: "button",
  memo: true,
  useHook: usePopoverTrigger,
});
