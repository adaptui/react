import { callAllHandlers } from "@chakra-ui/utils";
import { createComponent, createHook } from "reakit-system";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";

import { CALENDAR_BUTTON_KEYS } from "./__keys";
import { CalendarStateReturn } from "./CalendarState";

export type TGoto = "nextMonth" | "previousMonth" | "nextYear" | "previousYear";

export type CalendarButtonOptions = ButtonOptions &
  Pick<
    CalendarStateReturn,
    | "focusNextMonth"
    | "focusPreviousMonth"
    | "focusPreviousYear"
    | "focusNextYear"
  > & {
    goto: TGoto;
    getAriaLabel?: (goto: TGoto) => string;
  };

export type CalendarButtonHTMLProps = ButtonHTMLProps;

export type CalendarButtonProps = CalendarButtonOptions &
  CalendarButtonHTMLProps;

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
      getAriaLabel,
    } = options;

    const TYPES = {
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
      onClick: callAllHandlers(htmlOnClick, TYPES[goto]?.handler),
      "aria-label": getAriaLabel?.(goto) ?? TYPES[goto]?.ariaLabel,
      ...htmlProps,
    };
  },
});

export const CalendarButton = createComponent({
  as: "button",
  memo: true,
  useHook: useCalendarButton,
});
