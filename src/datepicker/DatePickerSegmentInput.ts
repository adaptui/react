import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { DATE_PICKER_SEGMENT_INPUT_KEYS } from "./__keys";

export type DatePickerSegmentInputOptions = CompositeOptions;

export type DatePickerSegmentInputHTMLProps = CompositeHTMLProps;

export type DatePickerSegmentInputProps = DatePickerSegmentInputOptions &
  DatePickerSegmentInputHTMLProps;

export const useDatePickerSegmentInput = createHook<
  DatePickerSegmentInputOptions,
  DatePickerSegmentInputHTMLProps
>({
  name: "DatePickerSegmentInput",
  compose: useComposite,
  keys: DATE_PICKER_SEGMENT_INPUT_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DatePickerSegmentInput = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerSegmentInput,
});
