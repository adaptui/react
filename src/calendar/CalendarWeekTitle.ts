import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CALENDAR_WEEK_TITLE_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

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

export type CalendarWeekTitleOptions = {
  dayIndex: number;
} & Pick<CalendarStateReturn, "weekDays"> &
  BoxOptions;

export type CalendarWeekTitleHTMLProps = BoxHTMLProps;

export type CalendarWeekTitleProps = CalendarWeekTitleOptions &
  CalendarWeekTitleHTMLProps;
