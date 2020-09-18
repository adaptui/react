import { callAllHandlers } from "@chakra-ui/utils";
import { ButtonHTMLProps, ButtonOptions, useButton } from "reakit";
import { createComponent, createHook } from "reakit-system";

import { CalendarState } from "./CalendarState";
import { CALENDAR_BUTTON_KEYS } from "./__keys";

export type CalendarNextYearButtonOptions = ButtonOptions & CalendarState;

export type CalendarNextYearButtonHTMLProps = ButtonHTMLProps;

export type CalendarNextYearButtonProps = CalendarNextYearButtonOptions &
  CalendarNextYearButtonHTMLProps;

export const useCalendarNextYearButton = createHook<
  CalendarNextYearButtonOptions,
  CalendarNextYearButtonHTMLProps
>({
  name: "CalendarNextYearButton",
  compose: useButton,
  keys: CALENDAR_BUTTON_KEYS,

  useProps({ focusNextYear }, { onClick: htmlOnClick, ...htmlProps }) {
    return {
      onClick: callAllHandlers(htmlOnClick, focusNextYear),
      "aria-label": "Next Year",
      ...htmlProps,
    };
  },
});

export const CalendarNextYearButton = createComponent({
  as: "button",
  memo: true,
  useHook: useCalendarNextYearButton,
});
