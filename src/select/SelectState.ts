import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import {
  SelectListState,
  SelectListActions,
  SelectListInitialState,
  useSelectListState,
} from "./SelectListState";
import {
  SelectPopoverState,
  SelectPopoverActions,
  SelectPopoverInitialState,
  useSelectPopoverState,
} from "./SelectPopoverState";

export function useSelectState(
  initialState: SealedInitialState<SelectInitialState> = {},
): SelectStateReturn {
  const sealed = useSealedState(initialState);
  const select = useSelectListState(sealed);
  return useSelectPopoverState(select, sealed);
}

export type SelectState = SelectPopoverState & SelectListState;

export type SelectActions = SelectPopoverActions & SelectListActions;

export type SelectInitialState = SelectPopoverInitialState &
  SelectListInitialState;

export type SelectStateReturn = SelectState & SelectActions;
