import { useCompositeState } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";

type ColumnType = "hour" | "minute" | "meridian";
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

function getSelectedValueFromDate(date: Date, type: ColumnType) {
  if (type === "minute") return date.getMinutes();
  if (type === "meridian") return date.getHours() >= 12 ? 1 : 0;
  return date.getHours() % 12 || 12;
}

function getSelectedDateFromValue(value: number, date: Date, type: ColumnType) {
  if (type === "minute") {
    return new Date(date.setMinutes(value));
  }

  if (type === "meridian") {
    let hours = date.getHours() % 12;

    if (value === 1) {
      hours = hours + 12;
    } else {
      hours = hours % 12;
    }

    return new Date(date.setHours(hours));
  }

  if (date.getHours() >= 12) {
    if (value !== 12) {
      value = value + 12;
    }
  } else {
    if (value !== 12) {
      value = value % 12;
    } else {
      value = 0;
    }
  }

  return new Date(date.setHours(value));
}
