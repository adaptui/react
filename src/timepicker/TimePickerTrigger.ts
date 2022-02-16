import {
  PickerBaseHTMLProps,
  PickerBaseOptions,
  usePickerBaseTrigger,
} from "../picker-base";
import { createComponent, createHook } from "../system";

import { TIME_PICKER_TRIGGER_KEYS } from "./__keys";
import { TimePickerStateReturn } from "./TimePickerState";

export type TimePickerTriggerOptions = PickerBaseOptions &
  TimePickerStateReturn;

export type TimePickerTriggerHTMLProps = PickerBaseHTMLProps;

export type TimePickerTriggerProps = TimePickerTriggerOptions &
  TimePickerTriggerHTMLProps;

export const useTimePickerTrigger = createHook<
  TimePickerTriggerOptions,
  TimePickerTriggerHTMLProps
>({
  name: "TimePickerTrigger",
  compose: usePickerBaseTrigger,
  keys: TIME_PICKER_TRIGGER_KEYS,

  useProps(_, htmlProps) {
    return {
      "aria-haspopup": "listbox",
      ...htmlProps,
    };
  },
});

export const TimePickerTrigger = createComponent({
  as: "button",
  memo: true,
  useHook: useTimePickerTrigger,
});
