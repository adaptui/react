import {
  InputBase,
  Validation,
  FocusableProps,
  ValueBase,
} from "@react-types/shared";
import { PopoverInitialState } from "reakit";

import { PickerBaseInitialState } from "../picker-base";
import { DateTimeFormatOptions, DateValue } from "../utils";

interface DatePickerBase
  extends PickerBaseInitialState,
    Validation,
    FocusableProps {
  minValue?: DateValue;
  maxValue?: DateValue;
  formatOptions?: DateTimeFormatOptions;
  placeholderDate?: DateValue;
  pickerId?: string;
  dialogId?: string;
}

export interface DatePickerStateInitialProps
  extends DatePickerBase,
    PopoverInitialState,
    ValueBase<DateValue> {}

export { ValidationState } from "@react-types/shared";
