import { PopoverState, PopoverStateProps, usePopoverState } from "ariakit";
import {
  DateRangePickerState,
  useDateRangePickerState,
} from "@react-stately/datepicker";
import { DateRangePickerProps, DateValue } from "@react-types/datepicker";

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
  datepicker: DateRangePickerState;
  popover: PopoverState;
};

export type DateRangePickerBaseStateProps = DateRangePickerProps<DateValue> &
  PopoverStateProps & {
    /**
     * Determines whether the date picker popover should close automatically when a date is selected.
     * @default true
     */
    shouldCloseOnSelect?: boolean | (() => boolean);
  };
