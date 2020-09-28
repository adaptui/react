import {
  useComposite,
  CompositeOptions,
  CompositeHTMLProps,
} from "reakit/Composite";
import { createComponent, createHook } from "reakit-system";

import { TIME_PICKER_COLUMN_KEYS } from "./__keys";

export type TimePickerColumnOptions = CompositeOptions;

export type TimePickerColumnHTMLProps = CompositeHTMLProps;

export type TimePickerColumnProps = TimePickerColumnOptions &
  TimePickerColumnHTMLProps;

export const useTimePickerColumn = createHook<
  TimePickerColumnOptions,
  TimePickerColumnHTMLProps
>({
  name: "TimePickerColumn",
  compose: useComposite,
  keys: TIME_PICKER_COLUMN_KEYS,

  useProps(options, htmlProps) {
    return {
      ...htmlProps,
    };
  },
});

export const TimePickerColumn = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerColumn,
});
