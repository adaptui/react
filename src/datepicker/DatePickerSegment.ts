import { createComponent, createHook } from "reakit-system";
import { unstable_useId as useId } from "reakit";

import { SegmentHTMLProps, SegmentOptions, useSegment } from "../segment";

import { DATE_PICKER_SEGMENT_KEYS } from "./__keys";
import { DatePickerStateReturn } from ".";

export type DatePickerSegmentOptions = SegmentOptions &
  Partial<Pick<DatePickerStateReturn, "pickerId" | "isDateRangePicker">>;

export type DatePickerSegmentHTMLProps = SegmentHTMLProps;

export type DatePickerSegmentProps = DatePickerSegmentOptions &
  DatePickerSegmentHTMLProps;

export const useDatePickerSegment = createHook<
  DatePickerSegmentOptions,
  DatePickerSegmentHTMLProps
>({
  name: "DatePickerSegment",
  compose: useSegment,
  keys: DATE_PICKER_SEGMENT_KEYS,

  useProps(options, htmlProps) {
    const { id } = useId({ baseId: "datepicker-segment" });
    return {
      id,
      ...(options.isDateRangePicker
        ? { "aria-labelledby": `${options.pickerId} ${options.baseId} ${id}` }
        : { "aria-labelledby": id }),
      ...htmlProps,
    };
  },
});

export const DatePickerSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerSegment,
});
