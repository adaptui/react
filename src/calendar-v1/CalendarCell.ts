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

export type CalendarCellOptions = BoxOptions &
  Pick<CalendarStateReturn, "dateValue"> & {
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

  useProps({ date, dateValue }, htmlProps) {
    const isSelected = dateValue ? isSameDay(date, dateValue) : false;

    return {
      role: "gridcell",
      "data-weekend": isWeekend(date),
      "aria-selected": ariaAttr(isSelected),
      ...htmlProps,
    };
  },
});

export const CalendarCell = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarCell,
});
