import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CALENDAR_WEEK_TITLE_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export type CalendarWeekTitleOptions = BoxOptions &
  Pick<CalendarStateReturn, "weekDays"> & {
    dayIndex: number;
  };

export type CalendarWeekTitleHTMLProps = BoxHTMLProps;

export type CalendarWeekTitleProps = CalendarWeekTitleOptions &
  CalendarWeekTitleHTMLProps;

export const useCalendarWeekTitle = createHook<
  CalendarWeekTitleOptions,
  CalendarWeekTitleHTMLProps
>({
  name: "CalendarWeekTitle",
  compose: useBox,
  keys: CALENDAR_WEEK_TITLE_KEYS,

  useProps({ dayIndex, weekDays }, htmlProps) {
    return {
      "aria-label": weekDays[dayIndex]?.title,
      ...htmlProps,
    };
  },
});

export const CalendarWeekTitle = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarWeekTitle,
});
