import { RangeValue } from "@react-types/shared";
export type DateTimeFormatOptions = Intl.DateTimeFormatOptions & {
  timeStyle?: string;
  dateStyle?: string;
};

export type DateValue = string | number | Date;

export interface RangeValueBase<T> {
  /** The smallest value allowed for the input. */
  minValue?: T;
  /** The largest value allowed for the input. */
  maxValue?: T;
}
