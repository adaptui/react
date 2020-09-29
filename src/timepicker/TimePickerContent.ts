import { createComponent, createHook } from "reakit-system";
import { PopoverHTMLProps, PopoverOptions, usePopover } from "reakit";

import { TIME_PICKER_CONTENT_KEYS } from "./__keys";

export type TimePickerContentOptions = PopoverOptions;

export type TimePickerContentHTMLProps = PopoverHTMLProps;

export type TimePickerContentProps = TimePickerContentOptions &
  TimePickerContentHTMLProps;

export const useTimePickerContent = createHook<
  TimePickerContentOptions,
  TimePickerContentHTMLProps
>({
  name: "TimePickerContent",
  compose: usePopover,
  keys: TIME_PICKER_CONTENT_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const TimePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerContent,
});
