import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { useForkRef } from "ariakit-utils";
import { As, Options, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { DatePickerState } from "./datepicker-state";
import { DateRangePickerState } from "./daterangepicker-state";

export const useDatePickerGroup = createHook<DatePickerGroupOptions>(
  ({ state, ...props }) => {
    props = { ...props, ref: useForkRef(state.ref, props.ref) };
    props = mergeProps(state.groupProps, props);

    return props;
  },
);

export const DatePickerGroup = createComponent<DatePickerGroupOptions>(
  props => {
    const htmlProps = useDatePickerGroup(props);

    return createElement("div", htmlProps);
  },
);

export type DatePickerGroupOptions<T extends As = "div"> = Options<T> & {
  /**
   * Object returned by the `useDatePickerState` hook.
   */
  state: DatePickerState | DateRangePickerState;
};

export type DatePickerGroupProps<T extends As = "div"> = Props<
  DatePickerGroupOptions<T>
>;
