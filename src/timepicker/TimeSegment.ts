import { createComponent, createHook } from "reakit-system";

import {
  useSegment,
  SegmentOptions,
  SegmentHTMLProps,
} from "../segment-spinner";
import { TimePickerStateReturn } from "./TimePickerState";
import { TIME_SEGMENT_KEYS } from "./__keys";

export type TimeSegmentOptions = SegmentOptions & TimePickerStateReturn;

export type TimeSegmentHTMLProps = SegmentHTMLProps;

export type TimeSegmentProps = TimeSegmentOptions & TimeSegmentHTMLProps;

export const useTimeSegment = createHook<
  TimeSegmentOptions,
  TimeSegmentHTMLProps
>({
  name: "TimeSegment",
  compose: useSegment,
  keys: TIME_SEGMENT_KEYS,
});

export const TimeSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useTimeSegment,
});
