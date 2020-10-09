import { createComponent, createHook } from "reakit-system";

import {
  SegmentFieldHTMLProps,
  SegmentFieldOptions,
  useSegmentField,
} from "../segment";
import { DATE_PICKER_SEGMENT_FIELD_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DatePickerSegmentFieldOptions = SegmentFieldOptions &
  DatePickerStateReturn;

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
