import { createComponent, createHook } from "reakit-system";
import { CompositeHTMLProps, CompositeOptions, useComposite } from "reakit";

import { DATE_SEGMENT_FIELD_KEYS } from "./__keys";
import { DatePickerStateReturn } from "./DatePickerState";

export type DateSegmentFieldOptions = CompositeOptions &
  Pick<DatePickerStateReturn, "pickerId">;

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

  useProps(options, { onKeyDown: htmlOnKeyDown, ...htmlProps }) {
    return {
      "aria-labelledby": options.pickerId,
      ...htmlProps,
    };
  },
});

export const DateSegmentField = createComponent({
  as: "div",
  memo: true,
  useHook: useDateSegmentField,
});
