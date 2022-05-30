import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { CalendarGridState } from "./calendar-grid-state";

export const useCalendarGrid = createHook<CalendarGridOptions>(
  ({ state, ...props }) => {
    props = mergeProps(state.gridProps, props);

    return props;
  },
);

export const CalendarGrid = createComponent<CalendarGridOptions>(props => {
  const htmlProps = useCalendarGrid(props);

  return createElement("table", htmlProps);
});

export type CalendarGridOptions<T extends As = "table"> = Options<T> & {
  /**
   * Object returned by the `useCalendarGridState` hook.
   */
  state: CalendarGridState;
};

export type CalendarGridProps<T extends As = "table"> = Props<
  CalendarGridOptions<T>
>;
