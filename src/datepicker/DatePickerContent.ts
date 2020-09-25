import { createComponent, createHook } from "reakit-system";
import { PopoverHTMLProps, PopoverOptions, usePopover } from "reakit";

import { DATE_PICKER_CONTENT_KEYS } from "./__keys";

export type DatePickerContentOptions = PopoverOptions;

export type DatePickerContentHTMLProps = PopoverHTMLProps;

export type DatePickerContentProps = DatePickerContentOptions &
  DatePickerContentHTMLProps;

export const useDatePickerContent = createHook<
  DatePickerContentOptions,
  DatePickerContentHTMLProps
>({
  name: "DatePickerContent",
  compose: usePopover,
  keys: DATE_PICKER_CONTENT_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DatePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerContent,
});
