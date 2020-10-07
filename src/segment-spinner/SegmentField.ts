import { createComponent, createHook } from "reakit-system";
import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";

import { SEGMENT_FIELD_KEYS } from "./__keys";

export type SegmentFieldOptions = CompositeOptions;

export type SegmentFieldHTMLProps = CompositeHTMLProps;

export type SegmentFieldProps = SegmentFieldOptions & SegmentFieldHTMLProps;

export const useSegmentField = createHook<
  SegmentFieldOptions,
  SegmentFieldHTMLProps
>({
  name: "SegmentField",
  compose: useComposite,
  keys: SEGMENT_FIELD_KEYS,

  useProps(options, htmlProps) {
    return htmlProps;
  },
});

export const SegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useSegmentField,
});
