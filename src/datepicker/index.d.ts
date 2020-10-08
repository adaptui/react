import { PopoverInitialState } from "reakit";
import {
  InputBase,
  Validation,
  FocusableProps,
  ValueBase,
} from "@react-types/shared";

interface DatePickerBase extends InputBase, Validation, FocusableProps {
  minValue?: DateValue;
  maxValue?: DateValue;
  formatOptions?: Intl.DateTimeFormatOptions;
  placeholderDate?: DateValue;
  pickerId?: string;
  dialogId?: string;
}

export interface DatePickerStateInitialProps
  extends DatePickerBase,
    PopoverInitialState,
    ValueBase<DateValue> {}

export { ValidationState } from "@react-types/shared";
