import { createComponent, createHook } from "reakit-system";

import {
  SegmentFieldHTMLProps,
  SegmentFieldOptions,
  useSegmentField,
} from "../segment";

import { TIME_PICKER_SEGMENT_FIELD_KEYS } from "./__keys";

export type TimePickerSegmentFieldOptions = SegmentFieldOptions;

export type TimePickerSegmentFieldHTMLProps = SegmentFieldHTMLProps;

export type TimePickerSegmentFieldProps = TimePickerSegmentFieldOptions &
  TimePickerSegmentFieldHTMLProps;

export const useTimePickerSegmentField = createHook<
  TimePickerSegmentFieldOptions,
  TimePickerSegmentFieldHTMLProps
>({
  name: "TimePickerSegmentField",
  compose: useSegmentField,
  keys: TIME_PICKER_SEGMENT_FIELD_KEYS,
});

export const TimePickerSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerSegmentField,
});
