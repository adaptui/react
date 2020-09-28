import React from "react";
import { useCompositeState } from "reakit";

interface Props {
  onChange?: (v: number) => void;
  value?: number;
}

export const useTimePickerColumnState = ({ onChange, value }: Props = {}) => {
  const [selected, setSelected] = React.useState(value);
  const composite = useCompositeState({
    orientation: "vertical",
  });

  const handleSelected = (v: number) => {
    setSelected(v);
    onChange?.(v);
  };

  return { selected, setSelected: handleSelected, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
