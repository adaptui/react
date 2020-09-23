import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { DATE_PICKER_KEYS } from "./__keys";

export type DatePickerOptions = BoxOptions;

export type DatePickerHTMLProps = BoxHTMLProps;

export type DatePickerProps = DatePickerOptions & DatePickerHTMLProps;

export const useDatePicker = createHook<DatePickerOptions, DatePickerHTMLProps>(
  {
    name: "DatePicker",
    compose: useBox,
    keys: DATE_PICKER_KEYS,

    useProps(options, htmlProps) {
      return htmlProps;
    },
  },
);

export const DatePicker = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePicker,
});
