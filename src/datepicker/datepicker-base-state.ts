import { PopoverState, PopoverStateProps, usePopoverState } from "ariakit";
import {
  DatePickerState,
  DatePickerStateOptions as DatePickerStateProps,
  useDatePickerState,
} from "@react-stately/datepicker";

export function useDatePickerBaseState(
  props: DatePickerBaseStateProps,
): DatePickerBaseState {
  const datepicker = useDatePickerState(props);
  const { isOpen, setOpen } = datepicker;
  console.log("%cisOpen", "color: #007300", isOpen);

  const popover = usePopoverState({
    open: isOpen,
    setOpen: setOpen,
    ...props,
  });

  return { datepicker, popover };
}

export type DatePickerBaseState = {
  /**
   * Object returned by the `useDatePickerState` hook.
   */
  datepicker: DatePickerState;
  /**
   * Object returned by the `usePopoverState` hook.
   */
  popover: PopoverState;
};

export type DatePickerBaseStateProps = DatePickerStateProps &
  PopoverStateProps & {};
