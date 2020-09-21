import { KeyboardEvent, useRef } from "react";
import { BoxHTMLProps, BoxOptions, useBox } from "reakit";
import { createOnKeyDown, useForkRef } from "reakit-utils";
import { createComponent, createHook } from "reakit-system";
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils";

import { CALENDAR_GRID_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export type CalendarGridOptions = BoxOptions &
  Pick<
    CalendarStateReturn,
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
  >;

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

    return {
      ref: useForkRef(ref, htmlRef),
      role: "grid",
      "aria-readonly": ariaAttr(isReadOnly),
      "aria-disabled": ariaAttr(isDisabled),
      onKeyDown,
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
