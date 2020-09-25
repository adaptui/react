import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";

export type DateSegmentFieldOptions = CompositeOptions;

export type DateSegmentFieldHTMLProps = CompositeHTMLProps;

export type DateSegmentFieldProps = DateSegmentFieldOptions &
  DateSegmentFieldHTMLProps;

export const useDateSegmentField = createHook<
  DateSegmentFieldOptions,
  DateSegmentFieldHTMLProps
>({
  name: "DateSegmentField",
  compose: useComposite,
  keys: DATE_SEGMENT_FIELD_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const DateSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegmentField,
});
