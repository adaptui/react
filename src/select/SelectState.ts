import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

import {
  SelectListActions,
  SelectListInitialState,
  SelectListState,
  useSelectListState,
} from "./SelectListState";
import {
  SelectPopoverActions,
  SelectPopoverInitialState,
  SelectPopoverState,
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
