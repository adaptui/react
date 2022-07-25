import { PopoverState, PopoverStateProps, usePopoverState } from "ariakit";
import {
  DateRangePickerState,
  DateRangePickerStateOptions as DateRangePickerStateProps,
  useDateRangePickerState,
} from "@react-stately/datepicker";

export function useDateRangePickerBaseState(
  props: DateRangePickerBaseStateProps,
): DateRangePickerBaseState {
  const datepicker = useDateRangePickerState(props);
  const { isOpen, setOpen } = datepicker;

  const popover = usePopoverState({
    visible: isOpen,
    setVisible: setOpen,
    ...props,
  });

  return { datepicker, popover };
}

export type DateRangePickerBaseState = {
  /**
   * Object returned by the `useDatePickerState` hook.
   */
  datepicker: DateRangePickerState;
  /**
   * Object returned by the `usePopoverState` hook.
   */
  popover: PopoverState;
};

export type DateRangePickerBaseStateProps = DateRangePickerStateProps &
  PopoverStateProps & {};
