/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { BoxOptions } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { RANGE_CALENDAR_KEYS } from "./__keys";
import { RangeCalendarStateReturn } from "./CalendarRangeState";
import { CalendarHTMLProps, CalendarOptions, useCalendar } from "./Calendar";

export type RangeCalendarOptions = BoxOptions &
  CalendarOptions &
  Pick<RangeCalendarStateReturn, "setAnchorDate">;

export type RangeCalendarHTMLProps = CalendarHTMLProps;

export type RangeCalendarProps = RangeCalendarOptions & RangeCalendarHTMLProps;

export const useRangeCalendar = createHook<
  RangeCalendarOptions,
  RangeCalendarHTMLProps
>({
  name: "RangeCalendar",
  compose: useCalendar,
  keys: RANGE_CALENDAR_KEYS,

  useProps({ setAnchorDate }, htmlProps) {
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
