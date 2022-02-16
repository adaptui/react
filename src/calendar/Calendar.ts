/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";

import { createComponent, createHook } from "../system";

import { CALENDAR_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export const useCalendar = createHook<CalendarOptions, CalendarHTMLProps>({
  name: "Calendar",
  compose: useRole,
  keys: CALENDAR_KEYS,

  useProps({ calendarId }, htmlProps) {
    return {
      role: "group",
      "aria-labelledby": calendarId,
      ...htmlProps,
    };
  },
});

export const Calendar = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendar,
});

export type CalendarOptions = RoleOptions &
  Pick<CalendarStateReturn, "calendarId">;

export type CalendarHTMLProps = RoleHTMLProps;

export type CalendarProps = CalendarOptions & CalendarHTMLProps;
