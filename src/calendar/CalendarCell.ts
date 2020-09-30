/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { useCallback } from "react";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { getDaysInMonth, isSameDay, isWeekend } from "date-fns";
import { ariaAttr, callAllHandlers, dataAttr } from "@chakra-ui/utils";

import { CALENDAR_CELL_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";
import { RangeCalendarStateReturn } from "./RangeCalendarState";

export type CalendarCellOptions = BoxOptions &
  Pick<CalendarStateReturn, "dateValue" | "isDisabled" | "currentMonth"> &
  Partial<
    Pick<RangeCalendarStateReturn, "highlightDate" | "highlightedRange">
  > & {
    date: Date;
  };

export type CalendarCellHTMLProps = BoxHTMLProps;

export type CalendarCellProps = CalendarCellOptions & CalendarCellHTMLProps;

export const useCalendarCell = createHook<
  CalendarCellOptions,
  CalendarCellHTMLProps
>({
  name: "CalendarCell",
  compose: useBox,
  keys: CALENDAR_CELL_KEYS,

  useProps(options, { onMouseEnter: htmlOnMouseEnter, ...htmlProps }) {
    const { isDisabled, highlightDate, date } = options;
    const onMouseEnter = useCallback(() => {
      if (isDisabled) return;

      highlightDate?.(date);
    }, [date, highlightDate, isDisabled]);

    return {
      role: "gridcell",
      "data-weekend": dataAttr(isWeekend(date)),
      onMouseEnter:
        "highlightDate" in options
          ? callAllHandlers(htmlOnMouseEnter, onMouseEnter)
          : htmlOnMouseEnter,
      ...getCalendarCellProps(options),
      ...htmlProps,
    };
  },
});

export const CalendarCell = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarCell,
});

const getCalendarCellProps = (options: CalendarCellOptions) => {
  const { date, dateValue, highlightedRange, currentMonth } = options;

  if ("highlightDate" in options) {
    const isSelected = highlightedRange
      ? date >= highlightedRange.start && date <= highlightedRange.end
      : false;

    const isRangeStart = isSelected && date.getDate() === 1;
    const isRangeEnd =
      isSelected && date.getDate() === getDaysInMonth(currentMonth);
    const isSelectionStart = highlightedRange
      ? isSameDay(date, highlightedRange.start)
      : false;
    const isSelectionEnd = highlightedRange
      ? isSameDay(date, highlightedRange.end)
      : false;

    return {
      "aria-selected": ariaAttr(isSelected),
      "data-is-range-selection": dataAttr(isSelected),
      "data-is-range-end": dataAttr(isRangeEnd),
      "data-is-range-start": dataAttr(isRangeStart),
      "data-is-selection-end": dataAttr(isSelectionEnd),
      "data-is-selection-start": dataAttr(isSelectionStart),
    };
  }

  const isSelected = dateValue ? isSameDay(date, dateValue) : false;

  return {
    "aria-selected": ariaAttr(isSelected),
  };
};
