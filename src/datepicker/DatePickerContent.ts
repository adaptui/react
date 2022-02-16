import {
  PickerBaseHTMLProps,
  PickerBaseOptions,
  usePickerBaseContent,
} from "../picker-base";
import { createComponent, createHook } from "../system";

import { DATE_PICKER_CONTENT_KEYS } from "./__keys";

export type DatePickerContentOptions = PickerBaseOptions;

export type DatePickerContentHTMLProps = PickerBaseHTMLProps;

export type DatePickerContentProps = DatePickerContentOptions &
  DatePickerContentHTMLProps;

export const useDatePickerContent = createHook<
  DatePickerContentOptions,
  DatePickerContentHTMLProps
>({
  name: "DatePickerContent",
  compose: usePickerBaseContent,
  keys: DATE_PICKER_CONTENT_KEYS,
});

export const DatePickerContent = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerContent,
});
