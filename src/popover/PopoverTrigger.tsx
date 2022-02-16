import {
  DialogDisclosureHTMLProps,
  DialogDisclosureOptions,
  useDialogDisclosure,
} from "../dialog";
import { createComponent, createHook } from "../system";

import { POPOVER_TRIGGER_KEYS } from "./__keys";

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
  keys: POPOVER_TRIGGER_KEYS,

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
