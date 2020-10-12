import { useCompositeState } from "reakit";
import { ValueBase } from "@react-types/shared";
import { useControllableState } from "@chakra-ui/hooks";

import { getSelectedValueFromDate, getSelectedDateFromValue } from "./__utils";

export type ColumnType = "hour" | "minute" | "meridian";

export interface TimePickerColumnInitialState extends ValueBase<Date> {
  visible?: boolean;
  columnType?: ColumnType;
}

export const useTimePickerColumnState = (
  props: TimePickerColumnInitialState = {},
) => {
  const {
    value: time,
    defaultValue = new Date(),
    onChange,
    visible,
    columnType = "hour",
  } = props;

  const [date, setDate] = useControllableState({
    value: time,
    defaultValue,
    onChange,
  });

  const selected = getSelectedValueFromDate(date, columnType);

  const composite = useCompositeState({
    loop: true,
    wrap: true,
    orientation: "vertical",
  });

  const setSelected = (value: number) => {
    setDate(getSelectedDateFromValue(value, date, columnType));
  };

  return { selected, setSelected, visible, columnType, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
