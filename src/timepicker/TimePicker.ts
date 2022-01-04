import { createHook } from "reakit-system";

import {
  PickerBaseHTMLProps,
  PickerBaseOptions,
  usePickerBase,
} from "../picker-base";
import { createComponent } from "../system";

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
