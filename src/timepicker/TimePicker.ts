import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { TIME_PICKER_KEYS } from "./__keys";

export type TimePickerOptions = CompositeOptions;

export type TimePickerHTMLProps = CompositeHTMLProps;

export type TimePickerProps = TimePickerOptions & TimePickerHTMLProps;

export const useTimePicker = createHook<TimePickerOptions, TimePickerHTMLProps>(
  {
    name: "TimePicker",
    compose: useComposite,
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
