import React from "react";
import { useSealedState, SealedInitialState } from "reakit-utils";
import {
  useCompositeState,
  CompositeActions,
  CompositeState,
  CompositeInitialState,
  CompositeStateReturn,
} from "reakit/Composite";
import {
  usePopoverState,
  PopoverStateReturn,
  PopoverState,
  PopoverActions,
  PopoverInitialState,
} from "reakit/Popover";

type Value = {
  value: string;
  id: string;
};

export type SelectState = CompositeState &
  PopoverState & {
    allowMultiselect?: boolean;
    selected: string[];
    isPlaceholder: boolean;
    inputValue: string;
    isCombobox: boolean;
    values: Value[];
  };

export type SelectActions = CompositeActions &
  PopoverActions & {
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    removeSelected: (value: string) => void;
    setSelected: (value: string, shouldRemainOpen?: boolean) => void;
  };

export type SelectInitialState = CompositeInitialState &
  PopoverInitialState & {
    selected?: string;
    allowMultiselect?: boolean;
    loop?: boolean;
    isCombobox?: boolean;
  };

export type SelectStateReturn = CompositeStateReturn &
  PopoverStateReturn &
  SelectState &
  SelectActions;

export const useSelectState = (
  initialState: SealedInitialState<SelectInitialState> = {},
): SelectStateReturn => {
  const {
    selected: initialValue,
    allowMultiselect,
    loop = true,
    isCombobox = false,
    placement = "bottom-start",
    ...sealed
  } = useSealedState(initialState);

  const composite = useCompositeState({
    ...sealed,
    loop,
    unstable_virtual: true,
  });
  const popover = usePopoverState({
    ...sealed,
    placement,
    unstable_offset: [0, 10],
  });

  const [values, setValues] = React.useState<Value[]>([]);
  const [isPlaceholder, setIsPlaceholder] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [selectedValue, setSelectedValue] = React.useState<string[]>(() => {
    if (initialValue) {
      return [initialValue];
    }
    return [];
  });

  const removeSelected = (value: string) => {
    setSelectedValue(selectedValue.filter(item => item !== value));
  };

  const { hide } = popover;

  const setSelected = React.useCallback(
    (value: string, shouldRemainOpen?: boolean) => {
      if (allowMultiselect) {
        console.log("%c selectedValue", "color: #00a3cc", selectedValue);
        selectedValue.includes(value)
          ? setSelectedValue(selectedValue.filter(item => item !== value))
          : setSelectedValue([...selectedValue, value]);

        setInputValue("");
      } else {
        setSelectedValue([value]);
        setInputValue("");
        !shouldRemainOpen && hide();
      }
    },
    [allowMultiselect, hide, selectedValue],
  );

  React.useLayoutEffect(() => {
    setIsPlaceholder(selectedValue.length < 1);
  }, [selectedValue]);

  React.useEffect(() => {
    if (composite.items.length > 0) {
      const _values = composite.items.map(item => ({
        value: item.ref.current?.dataset.value ?? "",
        id: item.id ?? "",
      }));

      setValues(_values);
    }
  }, [composite.items]);

  return {
    ...composite,
    ...popover,
    isPlaceholder,
    isCombobox,
    allowMultiselect,
    selected: selectedValue,
    setSelected,
    removeSelected,
    inputValue,
    setInputValue,
    values,
  };
};
