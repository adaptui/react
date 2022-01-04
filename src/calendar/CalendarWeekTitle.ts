import { createHook } from "reakit-system";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";

import { createComponent } from "../system";

import { CALENDAR_WEEK_TITLE_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export const useCalendarWeekTitle = createHook<
  CalendarWeekTitleOptions,
  CalendarWeekTitleHTMLProps
>({
  name: "CalendarWeekTitle",
  compose: useRole,
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

export type CalendarWeekTitleOptions = RoleOptions &
  Pick<CalendarStateReturn, "weekDays"> & {
    dayIndex: number;
  };

export type CalendarWeekTitleHTMLProps = RoleHTMLProps;

export type CalendarWeekTitleProps = CalendarWeekTitleOptions &
  CalendarWeekTitleHTMLProps;
