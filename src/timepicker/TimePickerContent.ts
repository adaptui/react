import { createComponent, createHook } from "reakit-system";

import {
  PickerBaseContentHTMLProps,
  PickerBaseContentOptions,
  usePickerBaseContent,
} from "../picker-base";
import { TIME_PICKER_CONTENT_KEYS } from "./__keys";

export type TimePickerContentOptions = PickerBaseContentOptions;

export type TimePickerContentHTMLProps = PickerBaseContentHTMLProps;

export type TimePickerContentProps = TimePickerContentOptions &
  TimePickerContentHTMLProps;

export const useTimePickerContent = createHook<
  TimePickerContentOptions,
  TimePickerContentHTMLProps
>({
  name: "TimePickerContent",
  compose: usePickerBaseContent,
  keys: TIME_PICKER_CONTENT_KEYS,
});

export const TimePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerContent,
});
