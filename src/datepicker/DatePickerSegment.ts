import { DatePickerStateReturn } from ".";
import { createComponent, createHook } from "reakit-system";

import { useSegment, SegmentOptions, SegmentHTMLProps } from "../segment";
import { DATE_PICKER_SEGMENT_KEYS } from "./__keys";

export type DatePickerSegmentOptions = SegmentOptions & DatePickerStateReturn;

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
