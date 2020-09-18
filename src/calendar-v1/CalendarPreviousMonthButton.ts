import { callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CalendarState } from "./CalendarState";
import { CALENDAR_BUTTON_KEYS } from "./__keys";

export type CalendarPreviousMonthButtonOptions = ButtonOptions & CalendarState;

export type CalendarPreviousMonthButtonHTMLProps = ButtonHTMLProps;

export type CalendarPreviousMonthButtonProps = CalendarPreviousMonthButtonOptions &
  CalendarPreviousMonthButtonHTMLProps;

export const useCalendarPreviousMonthButton = createHook<
  CalendarPreviousMonthButtonOptions,
  CalendarPreviousMonthButtonHTMLProps
>({
  name: "CalendarPreviousMonthButton",
  compose: useButton,
  keys: CALENDAR_BUTTON_KEYS,

  useProps({ focusPreviousMonth }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      onClick: callAllHandlers(htmlOnClick, focusPreviousMonth),
      "aria-label": "Previous Month",
      ...htmlProps,
    };
  },
});

export const CalendarPreviousMonthButton = createComponent({
  as: "button",
  memo: true,
  useHook: useCalendarPreviousMonthButton,
});
