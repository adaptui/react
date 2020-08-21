import React from "react";
import {
  useCompositeState,
  CompositeActions,
  CompositeInitialState,
  CompositeState,
} from "reakit/Composite";

export type SelectState = CompositeState & {
  allowMultiselect?: boolean;
  selected: string[];
  typehead: string;
  isDropdownOpen: boolean;
  isPlaceholder: boolean;
};

interface selectInitialState {
  selected?: string;
  allowMultiselect?: boolean;
}

export type SelectInitialState = CompositeInitialState &
  Partial<Pick<SelectState, "selected" | "allowMultiselect">>;

export type SelectActions = CompositeActions & {
  setTypehead: React.Dispatch<React.SetStateAction<string>>;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  openDropdown: React.DispatchWithoutAction;
  closeDropdown: React.DispatchWithoutAction;
  toggleDropdown: React.DispatchWithoutAction;
  removeSelected: (value: string) => void;
  setSelected: (value: string, shouldRemainOpen?: boolean) => void;
  _setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export type SelectStateReturn = SelectState & SelectActions;

const useSelectState = ({
  selected,
  allowMultiselect,
}: selectInitialState): SelectStateReturn => {
  const composite = useCompositeState({ loop: true });

  const [typehead, setTypehead] = React.useState<string>("");
  const [isDropdownOpen, setDropdown] = React.useState<boolean>(false);
  const [isPlaceholder, setIsPlaceholder] = React.useState<boolean>(false);

  const toggleDropdown = React.useCallback(() => {
    setDropdown(prev => !prev);
  }, []);

  const openDropdown = React.useCallback(() => {
    setDropdown(true);
  }, []);

  const closeDropdown = React.useCallback(() => {
    setDropdown(false);
  }, []);

  const [_selected, _setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (selected) {
      _setSelected([selected]);
    }
  }, [selected]);

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
      } else {
        _setSelected([value]);
        !shouldRemainOpen && setDropdown(false);
        setTypehead("");
      }
    },
    [_selected, allowMultiselect],
  );

  React.useLayoutEffect(() => {
    setIsPlaceholder(_selected.length < 1);
  }, [_selected]);

  return {
    ...composite,
    allowMultiselect,
    typehead,
    setTypehead,
    setDropdown,
    openDropdown,
    closeDropdown,
    isDropdownOpen,
    toggleDropdown,
    removeSelected,
    selected: _selected,
    setSelected,
    _setSelected,
    isPlaceholder,
  };
};

export { useSelectState };
