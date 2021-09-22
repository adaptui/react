import { createComponent, createHook } from "reakit-system";
import {
  CompositeHTMLProps,
  CompositeOptions,
  useComposite,
} from "reakit/Composite";

import { TIME_PICKER_COLUMN_KEYS } from "./__keys";
import { TimePickerColumnStateReturn } from "./TimePickerColumnState";

export type TimePickerColumnOptions = CompositeOptions &
  Pick<TimePickerColumnStateReturn, "columnType">;

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

  useProps({ columnType }, htmlProps) {
    return {
      role: "listbox",
      "aria-label": columnType,
      ...htmlProps,
    };
  },
});

export const TimePickerColumn = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerColumn,
});
