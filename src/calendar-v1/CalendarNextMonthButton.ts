import { callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CalendarState } from "./CalendarState";
import { CALENDAR_BUTTON_KEYS } from "./__keys";

export type CalendarNextMonthButtonOptions = ButtonOptions & CalendarState;

export type CalendarNextMonthButtonHTMLProps = ButtonHTMLProps;

export type CalendarNextMonthButtonProps = CalendarNextMonthButtonOptions &
  CalendarNextMonthButtonHTMLProps;

export const useCalendarNextMonthButton = createHook<
  CalendarNextMonthButtonOptions,
  CalendarNextMonthButtonHTMLProps
>({
  name: "CalendarNextMonthButton",
  compose: useButton,
  keys: CALENDAR_BUTTON_KEYS,

  useProps({ focusNextMonth }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      onClick: callAllHandlers(htmlOnClick, focusNextMonth),
      "aria-label": "Next Month",
      ...htmlProps,
    };
  },
});

export const CalendarNextMonthButton = createComponent({
  as: "button",
  memo: true,
  useHook: useCalendarNextMonthButton,
});
