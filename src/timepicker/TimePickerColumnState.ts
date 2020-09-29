import React from "react";
import { useCompositeState } from "reakit";

interface Props {
  onChange?: (v: number | string) => void;
  onSelection?: (v: number | string) => void;
  value?: number | string;
}

export const useTimePickerColumnState = ({
  onChange,
  value,
  onSelection,
}: Props = {}) => {
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

  const onSelect = (v: number | string) => {
    onSelection?.(v);
  };

  React.useEffect(() => {
    const value = composite.items
      .find(item => item.id === composite.currentId)
      ?.ref.current?.getAttribute("data-value");

    if (value) {
      handleSelected(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composite.currentId]);

  return { selected, onSelection: onSelect, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
