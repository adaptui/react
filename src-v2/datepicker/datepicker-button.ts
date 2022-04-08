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

import { DatePickerState } from "./datepicker-state";

export const useDatePickerButton = createHook<DatePickerButtonOptions>(
  ({ state, ...props }) => {
    const ref = useRef(null);
    props = { ...props, ref: useForkRef(ref, props.ref) };
    const { buttonProps } = useButton(state.buttonProps, ref);
    console.log("%cbuttonProps", "color: #007300", buttonProps);
    props = mergeProps(buttonProps, props);

    return props;
  },
);

export const DatePickerButton = createComponent<DatePickerButtonOptions>(
  props => {
    const htmlProps = useDatePickerButton(props);

    return createElement("button", htmlProps);
  },
);

export type DatePickerButtonOptions<T extends As = "button"> = Options<T> & {
  /**
   * Object returned by the `useDatePickerButtonState` hook.
   */
  state: DatePickerState;
};

export type DatePickerButtonProps<T extends As = "button"> = Props<
  DatePickerButtonOptions<T>
>;
