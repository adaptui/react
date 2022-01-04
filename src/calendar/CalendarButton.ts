/**
 * All credit goes to [React Spectrum](https://github.com/adobe/react-spectrum)
 * We improved the Calendar from Aria [useCalendarBase](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/calendar/src/useCalendarBase.ts)
 * to work with Reakit System
 */
import { createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { callAllHandlers } from "@chakra-ui/utils";

import { createComponent } from "../system";

import { CALENDAR_BUTTON_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export const useCalendarButton = createHook<
  CalendarButtonOptions,
  CalendarButtonHTMLProps
>({
  name: "CalendarButton",
  compose: useButton,
  keys: CALENDAR_BUTTON_KEYS,

  useProps(options, { onClick: htmlOnClick, ...htmlProps }) {
    const {
      focusNextMonth,
      focusPreviousMonth,
      focusPreviousYear,
      focusNextYear,
      goto,
    } = options;

    const HANDLER_TYPES = {
      nextMonth: {
        handler: focusNextMonth,
        ariaLabel: "Next Month",
      },
      previousMonth: {
        handler: focusPreviousMonth,
        ariaLabel: "Previous Month",
      },
      nextYear: {
        handler: focusNextYear,
        ariaLabel: "Next Year",
      },
      previousYear: {
        handler: focusPreviousYear,
        ariaLabel: "Previous Year",
      },
    };

    return {
      "aria-label": HANDLER_TYPES[goto]?.ariaLabel,
      onClick: callAllHandlers(htmlOnClick, HANDLER_TYPES[goto]?.handler),
      ...htmlProps,
    };
  },
});

export const CalendarButton = createComponent({
  as: "button",
  memo: true,
  useHook: useCalendarButton,
});

export type CalendarButtonOptions = ButtonOptions &
  Pick<
    CalendarStateReturn,
    | "focusNextMonth"
    | "focusPreviousMonth"
    | "focusPreviousYear"
    | "focusNextYear"
  > & {
    goto: CalendarGoto;
  };

export type CalendarButtonHTMLProps = ButtonHTMLProps;

export type CalendarButtonProps = CalendarButtonOptions &
  CalendarButtonHTMLProps;

export type CalendarGoto =
  | "nextMonth"
  | "previousMonth"
  | "nextYear"
  | "previousYear";
