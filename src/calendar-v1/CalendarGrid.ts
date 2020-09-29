/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Stately [useWeekStart](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/calendar/src/useWeekStart.ts)
 * to work with Reakit System
 */
import { chain } from "@react-aria/utils";
import { useForkRef } from "reakit-utils";
import { KeyboardEvent, useRef } from "react";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

import { CALENDAR_GRID_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";
import { RangeCalendarStateReturn } from "./RangeCalendarState";

export type CalendarGridOptions = BoxOptions &
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
  > &
  Partial<Pick<RangeCalendarStateReturn, "highlightedRange" | "setAnchorDate">>;

export type CalendarGridHTMLProps = BoxHTMLProps;

export type CalendarGridProps = CalendarGridOptions & CalendarGridHTMLProps;

export const useCalendarGrid = createHook<
  CalendarGridOptions,
  CalendarGridHTMLProps
>({
  name: "CalendarGrid",
  compose: useBox,
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

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          selectFocusedDate();
          break;
        case "PageUp":
          e.preventDefault();
          if (e.shiftKey) {
            focusPreviousYear();
          } else {
            focusPreviousMonth();
          }
          break;
        case "PageDown":
          e.preventDefault();
          if (e.shiftKey) {
            focusNextYear();
          } else {
            focusNextMonth();
          }
          break;
        case "End":
          e.preventDefault();
          focusEndOfMonth();
          break;
        case "Home":
          e.preventDefault();
          focusStartOfMonth();
          break;
        case "ArrowLeft":
          e.preventDefault();
          focusPreviousDay();
          break;
        case "ArrowUp":
          e.preventDefault();
          focusPreviousWeek();
          break;
        case "ArrowRight":
          e.preventDefault();
          focusNextDay();
          break;
        case "ArrowDown":
          e.preventDefault();
          focusNextWeek();
          break;
      }
    };

    let rangeCalendarProps = {};

    if ("highlightDate" in options) {
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
