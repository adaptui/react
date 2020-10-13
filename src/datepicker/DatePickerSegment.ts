import { DatePickerStateReturn } from ".";
import { createComponent, createHook } from "reakit-system";

import { DATE_PICKER_SEGMENT_KEYS } from "./__keys";
import { DateRangePickerStateReturn } from "./DateRangePickerState";
import { useSegment, SegmentOptions, SegmentHTMLProps } from "../segment";

export type DatePickerSegmentOptions = SegmentOptions &
  Partial<DatePickerStateReturn & DateRangePickerStateReturn>;

export type DatePickerSegmentHTMLProps = SegmentHTMLProps;

export type DatePickerSegmentProps = DatePickerSegmentOptions &
  DatePickerSegmentHTMLProps;

export const useDatePickerSegment = createHook<
  DatePickerSegmentOptions,
  DatePickerSegmentHTMLProps
>({
  name: "DatePickerSegment",
  compose: useSegment,
  keys: DATE_PICKER_SEGMENT_KEYS,
});

export const DatePickerSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerSegment,
});
