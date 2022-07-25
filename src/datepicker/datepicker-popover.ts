import {
  createComponent,
  createElement,
  createHook,
} from "ariakit-utils/system";
import { PopoverOptions, usePopover } from "ariakit";
import { useEvent } from "ariakit-utils";
import { As, Props } from "ariakit-utils/types";
import { mergeProps } from "@react-aria/utils";

import { DateRangePickerState } from "../daterange-picker";

import { DatePickerState } from "./datepicker-state";

export const useDatePickerPopover = createHook<DatePickerPopoverOptions>(
  ({ state, ...props }) => {
    const onKeyDownProp = props.onKeyDown;

    const onKeyDown = useEvent((event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownProp?.(event);

      if (event.key !== "Escape") return;
      state.baseState.popover.hide();

      if (event.defaultPrevented) return;
    });

    props = usePopover({
      ...props,
      state: state.baseState.popover,
      modal: true,
      autoFocusOnShow: false,
      backdropProps: { onKeyDown },
    });
    props = mergeProps(state.dialogProps, props);

    return props;
  },
);

export const DatePickerPopover = createComponent<DatePickerPopoverOptions>(
  props => {
    const htmlProps = useDatePickerPopover(props);

    return createElement("span", htmlProps);
  },
);

export type DatePickerPopoverOptions<T extends As = "span"> = Omit<
  PopoverOptions<T>,
  "state"
> & {
  /**
   * Object returned by the `useDatePickerState` | `useDateRangePickerState` hook.
   */
  state: DatePickerState | DateRangePickerState;
};

export type DatePickerPopoverProps<T extends As = "span"> = Props<
  DatePickerPopoverOptions<T>
>;
