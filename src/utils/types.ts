export interface RangeValueBase<T> {
  /** The smallest value allowed. */
  minValue?: T;
  /** The largest value allowed. */
  maxValue?: T;
}

export type Booleanish = boolean | "true" | "false";
