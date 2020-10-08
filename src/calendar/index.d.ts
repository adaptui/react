import { RangeValue, ValueBase } from "@react-types/shared";
import { DateValue } from "../utils";

export interface CalendarPropsBase {
  minValue?: DateValue;
  maxValue?: DateValue;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
}

export interface CalendarProps
  extends CalendarPropsBase,
    ValueBase<DateValue> {}
export interface RangeCalendarProps
  extends CalendarPropsBase,
    ValueBase<RangeValue<DateValue>> {}
