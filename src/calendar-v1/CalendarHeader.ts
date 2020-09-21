import { createComponent, createHook } from "reakit-system";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";

import { CalendarStateReturn } from "./CalendarState";
import { CALENDAR_HEADER_KEYS } from "./__keys";
import { useDateFormatter } from "@react-aria/i18n";

export type CalendarHeaderOptions = BoxOptions &
  CalendarStateReturn & {
    format?: Intl.DateTimeFormatOptions;
  };

export type CalendarHeaderHTMLProps = BoxHTMLProps;

export type CalendarHeaderProps = CalendarHeaderOptions &
  CalendarHeaderHTMLProps;

export const useCalendarHeader = createHook<
  CalendarHeaderOptions,
  CalendarHeaderHTMLProps
>({
  name: "CalendarHeader",
  compose: useBox,
  keys: CALENDAR_HEADER_KEYS,

  useProps(
    { format = { month: "long", year: "numeric" }, currentMonth },
    { ...htmlProps },
  ) {
    return {
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
