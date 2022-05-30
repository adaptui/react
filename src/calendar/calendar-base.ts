import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { CalendarState } from "./calendar-state";

export const useCalendar = createHook<CalendarOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.calendarProps, props);

    return props;
  },
);

export const Calendar = createComponent<CalendarOptions>(props => {
  const htmlProps = useCalendar(props);

  return createElement("div", htmlProps);
});

export type CalendarOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useCalendarState` hook.
   */
  state: CalendarState;
};

export type CalendarProps<T extends As = "div"> = Props<CalendarOptions<T>>;
