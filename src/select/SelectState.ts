import React from "react";
import {
  useCompositeState,
  CompositeActions,
  CompositeState,
} from "reakit/Composite";
import { usePopoverState, PopoverStateReturn } from "reakit";
import { useSealedState, SealedInitialState } from "reakit-utils";

type Value = {
  value: string;
  id: string;
};

export type SelectState = CompositeState & {
  allowMultiselect?: boolean;
  selected: string[];
  isPlaceholder: boolean;
  inputValue: string;
  isCombobox: boolean;
  values: Value[];
};

export interface ISelectInitialState {
  selected?: string;
  allowMultiselect?: boolean;
  loop?: boolean;
  isCombobox?: boolean;
}

export type SelectActions = CompositeActions & {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  removeSelected: (value: string) => void;
  setSelected: (value: string, shouldRemainOpen?: boolean) => void;
  _setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export type SelectStateReturn = SelectState &
  SelectActions &
  PopoverStateReturn;

export const useSelectState = (
  initialState: SealedInitialState<ISelectInitialState> = {},
): SelectStateReturn => {
  const {
    selected,
    allowMultiselect,
    loop = true,
    isCombobox = false,
  } = useSealedState(initialState);

  const composite = useCompositeState({ loop, unstable_virtual: true });
  const popover = usePopoverState({
    placement: "bottom-start",
    unstable_offset: [0, 10],
  });
  const [values, setValues] = React.useState<Value[]>([]);

  const [isPlaceholder, setIsPlaceholder] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [_selected, _setSelected] = React.useState<string[]>([]);

  const removeSelected = (value: string) => {
    _setSelected(_selected.filter(item => item !== value));
  };

  const setSelected = React.useCallback(
    (value: string, shouldRemainOpen?: boolean) => {
      if (allowMultiselect) {
        _selected.includes(value)
          ? _setSelected(_selected.filter(item => item !== value))
          : _setSelected([..._selected, value]);

        setInputValue("");
      } else {
        _setSelected([value]);
        setInputValue("");
        !shouldRemainOpen && popover.hide();
      }
    },
    [_selected, allowMultiselect],
  );

  React.useEffect(() => {
    if (composite.items) {
      const _values = composite.items.map(item => ({
        value:
          item.ref.current?.attributes.getNamedItem("data-value")?.value ?? "",
        id: item.id ?? "",
      }));

      setValues(_values);
    }
  }, [composite.items]);

  React.useEffect(() => {
    if (selected) {
      _setSelected([selected]);
    }
  }, [selected]);

  React.useLayoutEffect(() => {
    setIsPlaceholder(_selected.length < 1);
  }, [_selected]);

  return {
    ...composite,
    ...popover,
    values,
    allowMultiselect,
    removeSelected,
    selected: _selected,
    setSelected,
    _setSelected,
    isPlaceholder,
    inputValue,
    setInputValue,
    isCombobox,
  };
};
