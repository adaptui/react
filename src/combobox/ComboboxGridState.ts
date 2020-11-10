import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  ComboboxListGridState,
  ComboboxListGridActions,
  ComboboxListGridInitialState,
  useComboboxListGridState,
} from "./ComboboxListGridState";
import {
  ComboboxPopoverState,
  ComboboxPopoverActions,
  ComboboxPopoverInitialState,
  useComboboxPopoverState,
} from "./ComboboxPopoverState";

export function useComboboxGridState(
  initialState: SealedInitialState<ComboboxGridInitialState> = {},
): ComboboxGridStateReturn {
  const sealed = useSealedState(initialState);
  const combobox = useComboboxListGridState(sealed);
  return useComboboxPopoverState(combobox, sealed);
}

export type ComboboxGridState = ComboboxPopoverState & ComboboxListGridState;

export type ComboboxGridActions = ComboboxPopoverActions &
  ComboboxListGridActions;

export type ComboboxGridInitialState = ComboboxPopoverInitialState &
  ComboboxListGridInitialState;

export type ComboboxGridStateReturn = ComboboxGridState & ComboboxGridActions;
