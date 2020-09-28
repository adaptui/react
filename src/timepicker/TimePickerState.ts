import React from "react";
import { useCompositeState } from "reakit";
import { useTimePickerColumnState } from "./TimePickerColumnState";

interface Props {
  onChange?: (v: number | string) => void;
  value?: number | string;
}

export const useTimePickerState = ({ onChange, value }: Props = {}) => {
  const hourState = useTimePickerColumnState();
  const minuteState = useTimePickerColumnState();
  const meridiesState = useTimePickerColumnState();
  const composite = useCompositeState({ orientation: "horizontal" });

  const hours = [...new Array(24).keys()];
  const minutes = [...new Array(60).keys()];
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
