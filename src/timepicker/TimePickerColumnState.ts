import React from "react";
import { useCompositeState } from "reakit";

interface Props {
  onChange?: (v: number | string) => void;
  value?: number | string;
}

export const useTimePickerColumnState = ({ onChange, value }: Props = {}) => {
  const [selected, setSelected] = React.useState(value);
  const composite = useCompositeState({
    loop: true,
    wrap: true,
    orientation: "vertical",
  });

  const handleSelected = (v: number | string) => {
    setSelected(v);
    onChange?.(v);
  };

  return { selected, setSelected: handleSelected, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
