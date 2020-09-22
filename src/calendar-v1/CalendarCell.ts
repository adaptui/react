/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { isWeekend } from "date-fns";
import { ariaAttr } from "@chakra-ui/utils";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import {
  getRangeCellOptionsReturn,
  RangeCalendarStateReturn,
} from "./CalendarRangeState";
import { CALENDAR_CELL_KEYS } from "./__keys";
import { CalendarStateReturn, getCellOptionsReturn } from "./CalendarState";

export type CalendarCellOptions = BoxOptions &
  Pick<CalendarStateReturn, "dateValue" | "isDisabled"> &
  Partial<Pick<RangeCalendarStateReturn, "highlightDate">> & {
    weekIndex: number;
    dayIndex: number;
    date: Date;
    getCellOptions: (
      weekIndex: number,
      dayIndex: number,
    ) => Partial<getRangeCellOptionsReturn & getCellOptionsReturn>;
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

  useProps(
    { date, getCellOptions, weekIndex, dayIndex, highlightDate, isDisabled },
    htmlProps,
  ) {
    const cellProps = getCellOptions?.(weekIndex, dayIndex);

    const onMouseEnter = () => {
      highlightDate && highlightDate(date);
    };

    return {
      onMouseEnter: isDisabled ? () => {} : onMouseEnter,
      role: "gridcell",
      "data-weekend": isWeekend(date),
      "aria-selected": ariaAttr(cellProps?.isSelected),
      "data-is-range-end": cellProps?.isRangeEnd,
      "data-is-range-start": cellProps?.isRangeStart,
      "data-is-selection-end": cellProps?.isSelectionEnd,
      "data-is-selection-start": cellProps?.isSelectionStart,
      "data-is-range-selection": cellProps?.isRangeSelection,
      ...htmlProps,
    };
  },
});

export const CalendarCell = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarCell,
});
