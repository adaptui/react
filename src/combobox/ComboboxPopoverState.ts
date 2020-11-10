import {
  PopoverState,
  PopoverActions,
  PopoverInitialState,
  usePopoverState,
} from "reakit";
import * as React from "react";

import { ComboboxListStateReturn } from "./ComboboxListState";
import { ComboboxListGridStateReturn } from "./ComboboxListGridState";

export function useComboboxPopoverState<
  T extends ComboboxListStateReturn | ComboboxListGridStateReturn
>(
  combobox: T,
  {
    gutter = 0,
    placement = "bottom-start",
    ...initialState
  }: ComboboxPopoverInitialState = {},
) {
  const { reset, inputValue, minValueLength } = combobox;
  const popover = usePopoverState({ gutter, placement, ...initialState });
  const visible = popover.visible && inputValue.length >= minValueLength;

  React.useEffect(() => {
    if (!visible) {
      // We need to reset combobox.moves
      reset();
    }
  }, [visible, reset]);

  return {
    ...combobox,
    ...popover,
    visible,
  };
}

export type ComboboxPopoverState = PopoverState;

export type ComboboxPopoverActions = PopoverActions;

export type ComboboxPopoverInitialState = PopoverInitialState;

export type ComboboxPopoverStateReturn = ComboboxPopoverState &
  ComboboxPopoverActions;
