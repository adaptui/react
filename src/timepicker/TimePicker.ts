import { createComponent, createHook } from "reakit-system";

import {
  usePickerBase,
  PickerBaseHTMLProps,
  PickerBaseOptions,
} from "../picker-base";
import { TIME_PICKER_KEYS } from "./__keys";

export type TimePickerOptions = PickerBaseOptions;

export type TimePickerHTMLProps = PickerBaseHTMLProps;

export type TimePickerProps = TimePickerOptions & TimePickerHTMLProps;

export const useTimePicker = createHook<TimePickerOptions, TimePickerHTMLProps>(
  {
    name: "TimePicker",
    compose: usePickerBase,
    keys: TIME_PICKER_KEYS,
  },
);

export const TimePicker = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePicker,
});
