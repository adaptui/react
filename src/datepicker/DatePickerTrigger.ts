import { createComponent, createHook } from "reakit-system";

import {
  PickerBaseTriggerHTMLProps,
  PickerBaseTriggerOptions,
  usePickerBaseTrigger,
} from "../picker-base";
import { DATE_PICKER_TRIGGER_KEYS } from "./__keys";

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
});

export const DatePickerTrigger = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerTrigger,
});
