import { createComponent, createHook } from "reakit-system";

import { useSegment, SegmentOptions, SegmentHTMLProps } from "../segment";
import { TimePickerStateReturn } from "./TimePickerState";
import { TIME_PICKER_SEGMENT_KEYS } from "./__keys";

export type TimePickerSegmentOptions = SegmentOptions & TimePickerStateReturn;

export type TimePickerSegmentHTMLProps = SegmentHTMLProps;

export type TimePickerSegmentProps = TimePickerSegmentOptions &
  TimePickerSegmentHTMLProps;

export const useTimePickerSegment = createHook<
  TimePickerSegmentOptions,
  TimePickerSegmentHTMLProps
>({
  name: "TimePickerSegment",
  compose: useSegment,
  keys: TIME_PICKER_SEGMENT_KEYS,
});

export const TimePickerSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useTimePickerSegment,
});
