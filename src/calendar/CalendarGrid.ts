/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useWeekStart](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/calendar/src/useWeekStart.ts)
 * to work with Reakit System
 */
import { chain } from "@react-aria/utils";
import { KeyboardEvent, useRef } from "react";
import { callAllHandlers } from "@chakra-ui/utils";
import { RoleHTMLProps, RoleOptions, useRole } from "reakit";
import { createOnKeyDown, useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";

import { ariaAttr } from "../utils";
import { CALENDAR_GRID_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";
import { RangeCalendarStateReturn } from "./RangeCalendarState";

export type CalendarGridOptions = RoleOptions &
  Pick<
    CalendarStateReturn,
    | "calendarId"
    | "isReadOnly"
    | "isDisabled"
    | "setFocused"
    | "selectFocusedDate"
    | "focusPreviousYear"
    | "focusPreviousMonth"
    | "focusNextYear"
    | "focusNextMonth"
    | "focusEndOfMonth"
    | "focusStartOfMonth"
    | "focusNextDay"
    | "focusPreviousDay"
    | "focusNextWeek"
    | "focusPreviousWeek"
    | "isRangeCalendar"
  > &
  Partial<Pick<RangeCalendarStateReturn, "setAnchorDate">>;

export type CalendarGridHTMLProps = RoleHTMLProps;

export type CalendarGridProps = CalendarGridOptions & CalendarGridHTMLProps;

export const useCalendarGrid = createHook<
  CalendarGridOptions,
  CalendarGridHTMLProps
>({
  name: "CalendarGrid",
  compose: useRole,
  keys: CALENDAR_GRID_KEYS,

  useProps(
    options,
    {
      ref: htmlRef,
      onKeyDown: htmlOnKeyDown,
      onBlur: htmlOnFocus,
      onBlur: htmlOnBlur,
      ...htmlProps
    },
  ) {
    const {
      isReadOnly,
      isDisabled,
      setFocused,
      selectFocusedDate,
      focusPreviousYear,
      focusPreviousMonth,
      focusNextYear,
      focusNextMonth,
      focusEndOfMonth,
      focusStartOfMonth,
      focusNextDay,
      focusPreviousDay,
      focusNextWeek,
      focusPreviousWeek,
      calendarId,
      setAnchorDate,
    } = options;
    const ref = useRef<HTMLElement>(null);

    const onKeyDown = createOnKeyDown({
      onKeyDown: htmlOnKeyDown,
      preventDefault: true,
      keyMap: (event: KeyboardEvent) => {
        const shift = event.shiftKey;

        return {
          " ": selectFocusedDate,
          Enter: selectFocusedDate,
          End: focusEndOfMonth,
          Home: focusStartOfMonth,
          ArrowLeft: focusPreviousDay,
          ArrowUp: focusPreviousWeek,
          ArrowRight: focusNextDay,
          ArrowDown: focusNextWeek,
          PageUp: () => {
            shift ? focusPreviousYear() : focusPreviousMonth();
          },
          PageDown: () => {
            shift ? focusNextYear() : focusNextMonth();
          },
        };
      },
    });

    let rangeCalendarProps = {};

    if (options.isRangeCalendar) {
      const onRangeKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Escape":
            // Cancel the selection.
            setAnchorDate?.(null);
            break;
        }
      };

      rangeCalendarProps = {
        "aria-multiselectable": true,
        onKeyDown: callAllHandlers(
          htmlOnKeyDown,
          chain(onKeyDown, onRangeKeyDown),
        ),
      };
    }

    return {
      ref: useForkRef(ref, htmlRef),
      role: "grid",
      "aria-labelledby": calendarId,
      "aria-readonly": ariaAttr(isReadOnly),
      "aria-disabled": ariaAttr(isDisabled),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onFocus: callAllHandlers(htmlOnFocus, () => setFocused(true)),
      onBlur: callAllHandlers(htmlOnBlur, () => setFocused(false)),
      ...rangeCalendarProps,
      ...htmlProps,
    };
  },
});

export const CalendarGrid = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarGrid,
});
