import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { TIME_PICKER_KEYS } from "./__keys";

export type TimePickerOptions = BoxOptions;

export type TimePickerHTMLProps = BoxHTMLProps;

export type TimePickerProps = TimePickerOptions & TimePickerHTMLProps;

export const useTimePicker = createHook<TimePickerOptions, TimePickerHTMLProps>(
  {
    name: "TimePicker",
    compose: useBox,
    keys: TIME_PICKER_KEYS,

    useProps(options, htmlProps) {
      return htmlProps;
    },
  },
);

export const TimePicker = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePicker,
});
