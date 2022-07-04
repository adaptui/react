import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useForkRef } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { CalendarCellState } from "./calendar-cell-state";

export const useCalendarCellButton = createHook<CalendarCellButtonOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.ref, props.ref) };
    props = mergeProps(state.buttonProps, props);

    return props;
  },
);

export const CalendarCellButton = createComponent<CalendarCellButtonOptions>(
  props => {
    const htmlProps = useCalendarCellButton(props);

    return createElement("span", htmlProps);
  },
);

export type CalendarCellButtonOptions<T extends As = "span"> = Options<T> & {
  /**
   * Object returned by the `useCalendarCellButtonState` hook.
   */
  state: CalendarCellState;
};

export type CalendarCellButtonProps<T extends As = "span"> = Props<
  CalendarCellButtonOptions<T>
>;
