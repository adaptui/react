import { useRef } from "react";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";
import { useForkRef } from "ariakit-utils";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { As, Options, Props } from "ariakit-utils/types";

import { CalendarState } from "./calendar-state";
import { RangeCalendarState } from "./range-calendar-state";

export const useCalendarPreviousButton =
  createHook<CalendarPreviousButtonOptions>(({ state, ...props }) => {
    const ref = useRef(null);
    props = { ...props, ref: useForkRef(ref, props.ref) };
    const { buttonProps } = useButton(state.prevButtonProps, ref);
    props = mergeProps(buttonProps, props);

    return props;
  });

export const CalendarPreviousButton =
  createComponent<CalendarPreviousButtonOptions>(props => {
    const htmlProps = useCalendarPreviousButton(props);

    return createElement("button", htmlProps);
  });

export type CalendarPreviousButtonOptions<T extends As = "button"> =
  Options<T> & {
    /**
     * Object returned by the `useCalendarPreviousButtonState` hook.
     */
    state: CalendarState | RangeCalendarState;
  };

export type CalendarPreviousButtonProps<T extends As = "button"> = Props<
  CalendarPreviousButtonOptions<T>
>;
