import { SegmentFieldOptions } from "./../segment-spinner/SegmentField";
import { createComponent, createHook } from "reakit-system";

import {
  SegmentFieldHTMLProps,
  useSegmentField,
} from "../segment-spinner/SegmentField";
import { TIME_SEGMENT_FIELD_KEYS } from "./__keys";
import { TimePickerStateReturn } from "./TimePickerState";

export type TimeSegmentFieldOptions = SegmentFieldOptions &
  TimePickerStateReturn;

export type TimeSegmentFieldHTMLProps = SegmentFieldHTMLProps;

export type TimeSegmentFieldProps = TimeSegmentFieldOptions &
  TimeSegmentFieldHTMLProps;

export const useTimeSegmentField = createHook<
  TimeSegmentFieldOptions,
  TimeSegmentFieldHTMLProps
>({
  name: "TimeSegmentField",
  compose: useSegmentField,
  keys: TIME_SEGMENT_FIELD_KEYS,
});

export const TimeSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useTimeSegmentField,
});
