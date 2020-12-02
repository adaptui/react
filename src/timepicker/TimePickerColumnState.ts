import * as React from "react";
import { useCompositeState } from "reakit";
import { ValueBase } from "@react-types/shared";

import { useControllableState } from "../utils";
import { getSelectedValueFromDate, getSelectedDateFromValue } from "./helpers";

export type ColumnType = "hour" | "minute" | "meridian";

export interface TimePickerColumnInitialState extends ValueBase<Date> {
  /**
   * Popover visible state
   */
  visible?: boolean;
  /**
   * TimePicker column type
   *
   * @default "hour"
   */
  columnType?: ColumnType;
}

export const useTimePickerColumnState = (
  props: TimePickerColumnInitialState = {},
) => {
  const {
    defaultValue = new Date(),
    value,
    onChange,
    visible,
    columnType = "hour",
  } = props;

  const [date, setDate] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const selected = getSelectedValueFromDate(date, columnType);

  const composite = useCompositeState({
    loop: true,
    wrap: true,
    orientation: "vertical",
  });

  const setSelected = React.useCallback(
    (value: number) => {
      setDate(getSelectedDateFromValue(value, date, columnType));
    },
    [columnType, date, setDate],
  );

  return { selected, setSelected, visible, columnType, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
