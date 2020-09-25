import {
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
  usePopoverDisclosure,
} from "reakit";

import { DATE_PICKER_TRIGGER_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";
import { DatePickerStateReturn } from "./DatePickerState";

export type DatePickerTriggerOptions = PopoverDisclosureOptions &
  DatePickerStateReturn;

export type DatePickerTriggerHTMLProps = PopoverDisclosureHTMLProps;

export type DatePickerTriggerProps = DatePickerTriggerOptions &
  DatePickerTriggerHTMLProps;

export const useDatePickerTrigger = createHook<
  DatePickerTriggerOptions,
  DatePickerTriggerHTMLProps
>({
  name: "DatePickerTrigger",
  compose: usePopoverDisclosure,
  keys: DATE_PICKER_TRIGGER_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DatePickerTrigger = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerTrigger,
});
