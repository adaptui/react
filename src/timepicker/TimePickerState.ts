import { useCompositeState } from "reakit";
import { useTimePickerColumnState } from "./TimePickerColumnState";

interface Props {
  onChange?: (v: number | string) => void;
  value?: number | string;
}

export const useTimePickerState = ({ onChange, value }: Props = {}) => {
  const hourState = useTimePickerColumnState({ value: 10 });
  const minuteState = useTimePickerColumnState({ value: 6 });
  const meridiesState = useTimePickerColumnState({ value: "PM" });
  const composite = useCompositeState({ orientation: "horizontal" });

  const hours = [...new Array(25).keys()].slice(1);
  const minutes = [...new Array(61).keys()].slice(1);
  const meridies = ["AM", "PM"];
  return {
    hours,
    minutes,
    meridies,
    hourState,
    minuteState,
    meridiesState,
    ...composite,
  };
};

export type TimePickerStateReturn = ReturnType<typeof useTimePickerState>;
