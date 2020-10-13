import { createComponent, createHook } from "reakit-system";

import {
  useSegmentField,
  SegmentFieldOptions,
  SegmentFieldHTMLProps,
} from "../segment";
import { DATE_PICKER_SEGMENT_FIELD_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";
import { DateRangePickerStateReturn } from "./DateRangePickerState";

export type DatePickerSegmentFieldOptions = SegmentFieldOptions &
  Partial<DatePickerStateReturn & DateRangePickerStateReturn>;

export type DatePickerSegmentFieldHTMLProps = SegmentFieldHTMLProps;

export type DatePickerSegmentFieldProps = DatePickerSegmentFieldOptions &
  DatePickerSegmentFieldHTMLProps;

export const useDatePickerSegmentField = createHook<
  DatePickerSegmentFieldOptions,
  DatePickerSegmentFieldHTMLProps
>({
  name: "DatePickerSegmentField",
  compose: useSegmentField,
  keys: DATE_PICKER_SEGMENT_FIELD_KEYS,
});

export const DatePickerSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerSegmentField,
});
