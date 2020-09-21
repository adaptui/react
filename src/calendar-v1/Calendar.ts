import { createComponent, createHook } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";

import { CalendarStateReturn } from "./CalendarState";
import { CALENDAR_KEYS } from "./__keys";

export type CalendarOptions = BoxOptions &
  Pick<CalendarStateReturn, "calendarId">;

export type CalendarHTMLProps = BoxHTMLProps;

export type CalendarProps = CalendarOptions & CalendarHTMLProps;

export const useCalendar = createHook<CalendarOptions, CalendarHTMLProps>({
  name: "Calendar",
  compose: useBox,
  keys: CALENDAR_KEYS,

  useProps({ calendarId }, { ...htmlProps }) {
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
