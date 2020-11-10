import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import {
  ComboboxListState,
  ComboboxListActions,
  ComboboxListInitialState,
  useComboboxListState,
} from "./ComboboxListState";
import {
  ComboboxPopoverState,
  ComboboxPopoverActions,
  ComboboxPopoverInitialState,
  useComboboxPopoverState,
} from "./ComboboxPopoverState";

export function useComboboxState(
  initialState: SealedInitialState<ComboboxInitialState> = {},
): ComboboxStateReturn {
  const sealed = useSealedState(initialState);
  const combobox = useComboboxListState(sealed);
  return useComboboxPopoverState(combobox, sealed);
}

export type ComboboxState = ComboboxPopoverState & ComboboxListState;

export type ComboboxActions = ComboboxPopoverActions & ComboboxListActions;

export type ComboboxInitialState = ComboboxPopoverInitialState &
  ComboboxListInitialState;

export type ComboboxStateReturn = ComboboxState & ComboboxActions;
