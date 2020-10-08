import { useCompositeState } from "reakit";
import { useControllableState } from "@chakra-ui/hooks";

interface TimePickerColumnInitialProps {
  value?: number;
  onChange?: (v: number) => void;
  visible?: boolean;
}

export const useTimePickerColumnState = (
  props: TimePickerColumnInitialProps = {},
) => {
  const { value, onChange, visible } = props;

  const [selected, setSelected] = useControllableState({ value, onChange });
  const composite = useCompositeState({
    loop: true,
    wrap: true,
    orientation: "vertical",
  });

  return { selected, setSelected, visible, ...composite };
};

export type TimePickerColumnStateReturn = ReturnType<
  typeof useTimePickerColumnState
>;
