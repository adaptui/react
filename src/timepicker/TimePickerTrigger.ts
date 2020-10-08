import {
  usePopoverDisclosure,
  PopoverDisclosureHTMLProps,
  PopoverDisclosureOptions,
} from "reakit";

import { TIME_PICKER_TRIGGER_KEYS } from "./__keys";
import { createComponent, createHook } from "reakit-system";

export type TimePickerTriggerOptions = PopoverDisclosureOptions;

export type TimePickerTriggerHTMLProps = PopoverDisclosureHTMLProps;

export type TimePickerTriggerProps = TimePickerTriggerOptions &
  TimePickerTriggerHTMLProps;

export const useTimePickerTrigger = createHook<
  TimePickerTriggerOptions,
  TimePickerTriggerHTMLProps
>({
  name: "TimePickerTrigger",
  compose: usePopoverDisclosure,
  keys: TIME_PICKER_TRIGGER_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const TimePickerTrigger = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerTrigger,
});
