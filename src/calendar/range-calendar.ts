import { mergeProps } from "@react-aria/utils";
import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { RangeCalendarState } from "./range-calendar-state";

export const useRangeCalendar = createHook<RangeCalendarOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.ref, props.ref) };
    props = mergeProps(state.calendarProps, props);

    return props;
  },
);

export const RangeCalendar = createComponent<RangeCalendarOptions>(props => {
  const htmlProps = useRangeCalendar(props);

  return createElement("div", htmlProps);
});

export type RangeCalendarOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useRangeCalendarState` hook.
   */
  state: RangeCalendarState;
};

export type RangeCalendarProps<T extends As = "div"> = Props<
  RangeCalendarOptions<T>
>;
