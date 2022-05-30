import { PopoverState, PopoverStateProps, usePopoverState } from "ariakit";
import { DatePickerState, useDatePickerState } from "@react-stately/datepicker";
import { DatePickerProps, DateValue } from "@react-types/datepicker";

export function useDatePickerBaseState(
  props: DatePickerBaseStateProps,
): DatePickerBaseState {
  const datepicker = useDatePickerState(props);
  const { isOpen, setOpen } = datepicker;

  const popover = usePopoverState({
    visible: isOpen,
    setVisible: setOpen,
    ...props,
  });

  return { datepicker, popover };
}

export type DatePickerBaseState = {
  datepicker: DatePickerState;
  popover: PopoverState;
};

export type DatePickerBaseStateProps = DatePickerProps<DateValue> &
  PopoverStateProps & {
    /**
     * Determines whether the date picker popover should close automatically when a date is selected.
     * @default true
     */
    shouldCloseOnSelect?: boolean | (() => boolean);
  };
