import { useForkRef } from "reakit-utils";
import { KeyboardEvent, useRef } from "react";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

import { CALENDAR_GRID_KEYS } from "./__keys";
import { CalendarState } from "./CalendarState";

export type CalendarGridOptions = BoxOptions & CalendarState;

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
    } = options;
    const ref = useRef<HTMLElement>(null);

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          selectFocusedDate();
          break;
        case "PageUp":
          event.preventDefault();
          if (event.shiftKey) {
            focusPreviousYear();
          } else {
            focusPreviousMonth();
          }
          break;
        case "PageDown":
          event.preventDefault();
          if (event.shiftKey) {
            focusNextYear();
          } else {
            focusNextMonth();
          }
          break;
        case "End":
          event.preventDefault();
          focusEndOfMonth();
          break;
        case "Home":
          event.preventDefault();
          focusStartOfMonth();
          break;
        case "ArrowLeft":
          event.preventDefault();
          focusPreviousDay();
          break;
        case "ArrowUp":
          event.preventDefault();
          focusPreviousWeek();
          break;
        case "ArrowRight":
          event.preventDefault();
          focusNextDay();
          break;
        case "ArrowDown":
          event.preventDefault();
          focusNextWeek();
          break;
      }
    };

    return {
      ref: useForkRef(ref, htmlRef),
      role: "grid",
      "aria-readonly": ariaAttr(isReadOnly),
      "aria-disabled": ariaAttr(isDisabled),
      onKeyDown: callAllHandlers(htmlOnKeyDown, onKeyDown),
      onFocus: callAllHandlers(htmlOnFocus, () => setFocused(true)),
      onBlur: callAllHandlers(htmlOnBlur, () => setFocused(false)),
      ...htmlProps,
    };
  },
});

export const CalendarGrid = createComponent({
  as: "div",
  memo: true,
  useHook: useCalendarGrid,
});
