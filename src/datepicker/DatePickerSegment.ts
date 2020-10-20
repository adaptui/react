import { DatePickerStateReturn } from ".";
import { unstable_useId as useId } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { DATE_PICKER_SEGMENT_KEYS } from "./__keys";
import { DateRangePickerStateReturn } from "./DateRangePickerState";
import { useSegment, SegmentOptions, SegmentHTMLProps } from "../segment";

export type DatePickerSegmentOptions =
  | (SegmentOptions &
      Pick<DatePickerStateReturn, "pickerId" | "isRangeCalendar">)
  | Partial<DatePickerStateReturn>
  | Partial<DateRangePickerStateReturn>;

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
      ...(options.isRangeCalendar && {
        "aria-labelledby": `${options.pickerId} ${options.baseId} ${id}`,
      }),
      ...htmlProps,
    };
  },
});

export const DatePickerSegment = createComponent({
  as: "div",
  memo: true,
  useHook: useDatePickerSegment,
});
