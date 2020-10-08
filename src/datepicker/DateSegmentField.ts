import { DatePickerStateReturn } from ".";
import { createComponent, createHook } from "reakit-system";

import {
  SegmentFieldHTMLProps,
  useSegmentField,
} from "../segment-spinner/SegmentField";
import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";

export type DateSegmentFieldOptions = DatePickerStateReturn;

export type DateSegmentFieldHTMLProps = SegmentFieldHTMLProps;

export type DateSegmentFieldProps = DateSegmentFieldOptions &
  DateSegmentFieldHTMLProps;

export const useDateSegmentField = createHook<
  DateSegmentFieldOptions,
  DateSegmentFieldHTMLProps
>({
  name: "DateSegmentField",
  compose: useSegmentField,
  keys: DATE_SEGMENT_FIELD_KEYS,
});

export const DateSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegmentField,
});
