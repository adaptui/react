import { DatePickerStateReturn } from ".";
import { createComponent, createHook } from "reakit-system";

import { DATE_SEGMENT_KEYS } from "./__keys";
import { SegmentHTMLProps, useSegment } from "../segment-spinner/Segment";

export type DateSegmentOptions = DatePickerStateReturn;

export type DateSegmentHTMLProps = SegmentHTMLProps;

export type DateSegmentProps = DateSegmentOptions & DateSegmentHTMLProps;

export const useDateSegment = createHook<
  DateSegmentOptions,
  DateSegmentHTMLProps
>({
  name: "DateSegment",
  compose: useSegment,
  keys: DATE_SEGMENT_KEYS,
});

export const DateSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegment,
});
