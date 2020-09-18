import { callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CalendarState } from "./CalendarState";
import { CALENDAR_BUTTON_KEYS } from "./__keys";

export type CalendarPreviousYearButtonOptions = ButtonOptions & CalendarState;

export type CalendarPreviousYearButtonHTMLProps = ButtonHTMLProps;

export type CalendarPreviousYearButtonProps = CalendarPreviousYearButtonOptions &
  CalendarPreviousYearButtonHTMLProps;

export const useCalendarPreviousYearButton = createHook<
  CalendarPreviousYearButtonOptions,
  CalendarPreviousYearButtonHTMLProps
>({
  name: "CalendarPreviousYearButton",
  compose: useButton,
  keys: CALENDAR_BUTTON_KEYS,

  useProps({ focusPreviousYear }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      onClick: callAllHandlers(htmlOnClick, focusPreviousYear),
      "aria-label": "Previous Year",
      ...htmlProps,
    };
  },
});

export const CalendarPreviousYearButton = createComponent({
  as: "button",
  memo: true,
  useHook: useCalendarPreviousYearButton,
});
