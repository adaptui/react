/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { BoxHTMLProps, BoxOptions } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CALENDAR_KEYS, RANGE_CALENDAR_KEYS } from "./__keys";
import { RangeCalendarStateReturn } from "./CalendarRangeState";
import {
  CalendarHTMLProps,
  CalendarOptions,
  CalendarProps,
  useCalendar,
} from "./Calendar";

export type RangeCalendarOptions = BoxOptions &
  CalendarOptions &
  Pick<
    RangeCalendarStateReturn,
    "calendarId" | "setAnchorDate" | "highlightedRange" | "anchorDate"
  >;

export type RangeCalendarHTMLProps = BoxHTMLProps & CalendarHTMLProps;

export type RangeCalendarProps = CalendarProps &
  RangeCalendarOptions &
  RangeCalendarHTMLProps;

export const useRangeCalendar = createHook<
  RangeCalendarOptions,
  RangeCalendarHTMLProps
>({
  name: "RangeCalendar",
  compose: [useCalendar],
  keys: RANGE_CALENDAR_KEYS,

  useProps({ setAnchorDate, highlightedRange }, htmlProps) {
    const { start, end } = highlightedRange || { start: null, end: null };

    const onKeyDown = (e: any) => {
      switch (e.key) {
        case "Escape":
          // Cancel the selection.
          setAnchorDate(null);
          break;
      }
    };

    return {
      "aria-multiselectable": true,
      onKeyDown,
      ...htmlProps,
    };
  },
});

export const RangeCalendar = createComponent({
  as: "div",
  memo: true,
  useHook: useRangeCalendar,
});
