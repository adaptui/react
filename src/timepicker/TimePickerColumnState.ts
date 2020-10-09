import { useCompositeState } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";

import { getSelectedValueFromDate, getSelectedDateFromValue } from "./__utils";

export type ColumnType = "hour" | "minute" | "meridian";
interface TimePickerColumnInitialProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (v: Date) => void;
  visible?: boolean;
  type?: ColumnType;
}

export const useTimePickerColumnState = (
  props: TimePickerColumnInitialProps = {},
) => {
  const {
    value: time,
    defaultValue = new Date(),
    onChange,
    visible,
    type = "hour",
  } = props;

  const [date, setDate] = useControllableState({
    value: time,
    defaultValue,
    onChange,
  });

  const selected = getSelectedValueFromDate(date, type);

  const composite = useCompositeState({
    loop: true,
    wrap: true,
    orientation: "vertical",
  });

  const setSelected = (value: number) => {
    setDate(getSelectedDateFromValue(value, date, type));
  };

  return { selected, setSelected, visible, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
