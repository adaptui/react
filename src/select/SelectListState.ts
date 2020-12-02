import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import { useCompositeState, CompositeInitialState } from "reakit";

import {
  SelectBaseState,
  SelectBaseActions,
  SelectBaseInitialState,
  useSelectBaseState,
} from "./SelectBaseState";

export function useSelectListState(
  initialState: SealedInitialState<SelectListInitialState> = {},
): SelectListStateReturn {
  const { orientation = "vertical", loop = true, ...sealed } = useSealedState(
    initialState,
  );

  const composite = useCompositeState({
    orientation,
    loop,
    ...sealed,
    unstable_virtual: true,
  });

  return useSelectBaseState(composite, sealed);
}

export type SelectListState = SelectBaseState;

export type SelectListActions = SelectBaseActions;

export type SelectListInitialState = Omit<
  CompositeInitialState,
  "unstable_virtual"
> &
  SelectBaseInitialState;

export type SelectListStateReturn = SelectListState & SelectListActions;
