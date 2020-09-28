import {
  useCompositeItem,
  CompositeItemOptions,
  CompositeItemHTMLProps,
} from "reakit";
import { createComponent, createHook } from "reakit-system";
import { TimePickerColumnStateReturn } from "./TimePickerColumnState";

import { TIME_PICKER_COLUMN_VALUE_KEYS } from "./__keys";

export type TimePickerColumnValueOptions = CompositeItemOptions &
  Pick<TimePickerColumnStateReturn, "setSelected" | "selected"> & {
    value: number;
  };

export type TimePickerColumnValueHTMLProps = CompositeItemHTMLProps;

export type TimePickerColumnValueProps = TimePickerColumnValueOptions &
  TimePickerColumnValueHTMLProps;

export const useTimePickerColumnValue = createHook<
  TimePickerColumnValueOptions,
  TimePickerColumnValueHTMLProps
>({
  name: "TimePickerColumnValue",
  compose: useCompositeItem,
  keys: TIME_PICKER_COLUMN_VALUE_KEYS,

  useProps({ setSelected, selected, value }, htmlProps) {
    return {
      onClick: () => setSelected(value),
      "data-selected": selected === value,
      ...htmlProps,
    };
  },
});

export const TimePickerColumnValue = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerColumnValue,
});
