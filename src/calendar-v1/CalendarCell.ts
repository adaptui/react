import { isSameDay } from "date-fns";
import { ariaAttr } from "@chakra-ui/utils";
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
