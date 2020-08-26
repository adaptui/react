import React from "react";
import {
  useCompositeState,
  CompositeActions,
  CompositeState,
} from "reakit/Composite";
import { usePopoverState, PopoverStateReturn } from "reakit";
import { useSealedState, SealedInitialState } from "reakit-utils";

export type SelectState = CompositeState & {
  allowMultiselect?: boolean;
  selected: string[];
  typehead: string;
  isPlaceholder: boolean;
  inputValue: string;
  isCombobox: boolean;
};

export interface ISelectInitialState {
  selected?: string;
  isCombobox?: boolean;
  allowMultiselect?: boolean;
  loop?: boolean;
}

export type SelectActions = CompositeActions & {
  setTypehead: React.Dispatch<React.SetStateAction<string>>;
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
    isCombobox = false,
    loop = true,
  } = useSealedState(initialState);

  const composite = useCompositeState({ loop, unstable_virtual: true });
  const popover = usePopoverState({
    placement: "bottom-start",
    unstable_offset: [0, 10],
  });

  const [typehead, setTypehead] = React.useState<string>("");
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

        setTypehead("");
        setInputValue("");
      } else {
        _setSelected([value]);
        !shouldRemainOpen && popover.hide();
        setTypehead("");
        setInputValue("");
      }
    },
    [_selected, allowMultiselect],
  );

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
    isCombobox,
    allowMultiselect,
    typehead,
    setTypehead,
    removeSelected,
    selected: _selected,
    setSelected,
    _setSelected,
    isPlaceholder,
    inputValue,
    setInputValue,
  };
};
