import { createComponent, createHook } from "reakit-system";

import {
  SegmentFieldHTMLProps,
  SegmentFieldOptions,
  useSegmentField,
} from "../segment-spinner";
import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DateSegmentFieldOptions = SegmentFieldOptions &
  DatePickerStateReturn;

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
