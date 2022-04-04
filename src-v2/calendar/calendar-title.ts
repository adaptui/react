import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { CalendarState } from "./calendar-state";

export const useCalendarTitle = createHook<CalendarTitleOptions>(
  ({ state, ...props }) => {
    props = { children: state.title, ...props };

    return props;
  },
);

export const CalendarTitle = createComponent<CalendarTitleOptions>(props => {
  const htmlProps = useCalendarTitle(props);

  return createElement("h2", htmlProps);
});

export type CalendarTitleOptions<T extends As = "h2"> = Options<T> & {
  /**
   * Object returned by the `useCalendarTitleState` hook.
   */
  state: CalendarState;
};

export type CalendarTitleProps<T extends As = "h2"> = Props<
  CalendarTitleOptions<T>
>;
