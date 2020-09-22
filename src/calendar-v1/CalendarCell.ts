/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { ariaAttr } from "@chakra-ui/utils";
import { isSameDay, isWeekend } from "date-fns";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CALENDAR_CELL_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";
import { RangeCalendarStateReturn } from "./CalendarRangeState";

export type CalendarCellOptions = BoxOptions &
  Pick<
    RangeCalendarStateReturn & CalendarStateReturn,
    "dateValue" | "getCellOptions" | "highlightDate"
  > & {
    weekIndex: number;
    dayIndex: number;
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

  useProps(
    { date, getCellOptions, weekIndex, dayIndex, highlightDate },
    htmlProps,
  ) {
    const cellProps = getCellOptions(weekIndex, dayIndex);

    const onMouseEnter = () => {
      highlightDate && highlightDate(date);
    };

    return {
      onMouseEnter,
      role: "gridcell",
      "data-is-range-start": cellProps.isRangeStart,
      "data-is-range-end": cellProps.isRangeEnd,
      "data-is-range-selection": cellProps.isRangeSelection,
      "data-is-selection-start": cellProps.isSelectionStart,
      "data-is-selection-end": cellProps.isSelectionEnd,
      "data-weekend": isWeekend(date),
      "aria-selected": ariaAttr(cellProps.isSelected),
      ...htmlProps,
    };
  },
});

export const CalendarCell = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarCell,
});
