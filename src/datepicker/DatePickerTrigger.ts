import { createComponent, createHook } from "reakit-system";

import { DATE_PICKER_TRIGGER_KEYS } from "./__keys";
import {
  PickerBaseTriggerHTMLProps,
  PickerBaseTriggerOptions,
  usePickerBaseTrigger,
} from "../picker-base";

export type DatePickerTriggerOptions = PickerBaseTriggerOptions;

export type DatePickerTriggerHTMLProps = PickerBaseTriggerHTMLProps;

export type DatePickerTriggerProps = DatePickerTriggerOptions &
  DatePickerTriggerHTMLProps;

export const useDatePickerTrigger = createHook<
  DatePickerTriggerOptions,
  DatePickerTriggerHTMLProps
>({
  name: "DatePickerTrigger",
  compose: usePickerBaseTrigger,
  keys: DATE_PICKER_TRIGGER_KEYS,

  useProps(_, htmlProps) {
    return htmlProps;
  },
});

export const DatePickerTrigger = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerTrigger,
});
