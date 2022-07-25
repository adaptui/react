import { useRef } from "react";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useForkRef } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";

import { RangeCalendarState } from "../range-calendar";

import { CalendarState } from "./calendar-state";

export const useCalendarNextButton = createHook<CalendarNextButtonOptions>(
  ({ state, ...props }) => {
    const ref = useRef(null);
    props = { ...props, ref: useForkRef(ref, props.ref) };
    const { buttonProps } = useButton(state.nextButtonProps, ref);
    props = mergeProps(buttonProps, props);

    return props;
  },
);

export const CalendarNextButton = createComponent<CalendarNextButtonOptions>(
  props => {
    const htmlProps = useCalendarNextButton(props);

    return createElement("button", htmlProps);
  },
);

export type CalendarNextButtonOptions<T extends As = "button"> = Options<T> & {
  /**
   * Object returned by the `useCalendarState` & `RangeCalendarState` hook.
   */
  state: CalendarState | RangeCalendarState;
};

export type CalendarNextButtonProps<T extends As = "button"> = Props<
  CalendarNextButtonOptions<T>
>;
