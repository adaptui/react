import { useRef } from "react";
import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { PopoverDisclosureOptions, usePopoverDisclosure } from "ariakit";
import { useForkRef } from "ariakit-utils";
import { As, Props } from "ariakit-utils/types";
import { useButton } from "@react-aria/button";

import { DateRangePickerState } from "../daterange-picker";

import { DatePickerState } from "./datepicker-state";

export const useDatePickerDisclosure = createHook<DatePickerDisclosureOptions>(
  ({ state, ...props }) => {
    const ref = useRef(null);
    props = { ...props, ref: useForkRef(ref, props.ref, state.ref) };

    props = usePopoverDisclosure({ ...props, state: state.baseState.popover });

    const { buttonProps } = useButton(state.buttonProps, ref);
    props = { ...props, ...buttonProps };

    return props;
  },
);

export const DatePickerDisclosure =
  createComponent<DatePickerDisclosureOptions>(props => {
    const htmlProps = useDatePickerDisclosure(props);

    return createElement("button", htmlProps);
  });

export type DatePickerDisclosureOptions<T extends As = "button"> = Omit<
  PopoverDisclosureOptions<T>,
  "state"
> & {
  /**
   * Object returned by the `useDatePickerState` | `useDateRangePickerState` hook.
   */
  state: DatePickerState | DateRangePickerState;
};

export type DatePickerDisclosureProps<T extends As = "button"> = Props<
  DatePickerDisclosureOptions<T>
>;
