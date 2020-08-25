import React from "react";
import {
  useCompositeState,
  CompositeActions,
  CompositeState,
} from "reakit/Composite";
import { usePopoverState, PopoverStateReturn } from "reakit";

export type SelectState = CompositeState & {
  allowMultiselect?: boolean;
  selected: string[];
  typehead: string;
  isPlaceholder: boolean;
};

export interface ISelectInitialState {
  selected?: string;
  allowMultiselect?: boolean;
  loop?: boolean;
}

export type SelectActions = CompositeActions & {
  setTypehead: React.Dispatch<React.SetStateAction<string>>;
  removeSelected: (value: string) => void;
  setSelected: (value: string, shouldRemainOpen?: boolean) => void;
  _setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export type SelectStateReturn = SelectState &
  SelectActions &
  PopoverStateReturn;

export const useSelectState = ({
  selected,
  allowMultiselect,
  loop = true,
}: ISelectInitialState): SelectStateReturn => {
  const composite = useCompositeState({ loop });
  const popover = usePopoverState({ placement: "bottom-start" });

  const [typehead, setTypehead] = React.useState<string>("");
  const [isPlaceholder, setIsPlaceholder] = React.useState<boolean>(false);

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
      } else {
        _setSelected([value]);
        !shouldRemainOpen && popover.hide();
        setTypehead("");
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
    allowMultiselect,
    typehead,
    setTypehead,
    removeSelected,
    selected: _selected,
    setSelected,
    _setSelected,
    isPlaceholder,
  };
};
