import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import {
  SelectListGridState,
  SelectListGridActions,
  SelectListGridInitialState,
  useSelectListGridState,
} from "./SelectListGridState";
import {
  SelectPopoverState,
  SelectPopoverActions,
  SelectPopoverInitialState,
  useSelectPopoverState,
} from "./SelectPopoverState";

export function useSelectGridState(
  initialState: SealedInitialState<SelectGridInitialState> = {},
): SelectGridStateReturn {
  const sealed = useSealedState(initialState);
  const select = useSelectListGridState(sealed);
  return useSelectPopoverState(select, sealed);
}

export type SelectGridState = SelectPopoverState & SelectListGridState;

export type SelectGridActions = SelectPopoverActions & SelectListGridActions;

export type SelectGridInitialState = SelectPopoverInitialState &
  SelectListGridInitialState;

export type SelectGridStateReturn = SelectGridState & SelectGridActions;
