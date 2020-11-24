import { useDateFormatter } from "@react-aria/i18n";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CALENDAR_HEADER_KEYS } from "./__keys";
import { DateTimeFormatOpts } from "../utils/types";
import { CalendarStateReturn } from "./CalendarState";

export const useCalendarHeader = createHook<
  CalendarHeaderOptions,
  CalendarHeaderHTMLProps
>({
  name: "CalendarHeader",
  compose: useBox,
  keys: CALENDAR_HEADER_KEYS,

  useProps(
    { format = { month: "long", year: "numeric" }, currentMonth, calendarId },
    htmlProps,
  ) {
    return {
      id: calendarId,
      children: useDateFormatter(format).format(currentMonth),
      "aria-live": "polite",
      ...htmlProps,
    };
  },
});

export const CalendarHeader = createComponent({
  as: "h2",
  memo: true,
  useHook: useCalendarHeader,
});

export type CalendarHeaderOptions = {
  format?: DateTimeFormatOpts;
} & Pick<CalendarStateReturn, "calendarId" | "currentMonth"> &
  BoxOptions;

export type CalendarHeaderHTMLProps = BoxHTMLProps;

export type CalendarHeaderProps = CalendarHeaderOptions &
  CalendarHeaderHTMLProps;
