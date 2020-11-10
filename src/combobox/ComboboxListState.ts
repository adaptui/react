import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  useCompositeState,
  CompositeState,
  CompositeActions,
  CompositeInitialState,
} from "reakit";

import {
  ComboboxBaseState,
  ComboboxBaseActions,
  ComboboxBaseInitialState,
  useComboboxBaseState,
} from "./ComboboxBaseState";

export function useComboboxListState(
  initialState: SealedInitialState<ComboboxListInitialState> = {},
): ComboboxListStateReturn {
  const { orientation = "vertical", loop = true, ...sealed } = useSealedState(
    initialState,
  );

  const composite = useCompositeState({
    orientation,
    loop,
    ...sealed,
    unstable_virtual: true,
  });

  return useComboboxBaseState(composite, sealed);
}

export type ComboboxListState = ComboboxBaseState<CompositeState>;

export type ComboboxListActions = ComboboxBaseActions<CompositeActions>;

export type ComboboxListInitialState = Omit<
  CompositeInitialState,
  "unstable_virtual"
> &
  ComboboxBaseInitialState;

export type ComboboxListStateReturn = ComboboxListState & ComboboxListActions;
