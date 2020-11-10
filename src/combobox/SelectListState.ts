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
  SelectBaseState,
  SelectBaseActions,
  SelectBaseInitialState,
  useSelectBaseState,
} from "./SelectBaseState";

export function useSelectListState(
  initialState: SealedInitialState<SelectListInitialState> = {},
): SelectListStateReturn {
  const { orientation = "vertical", ...sealed } = useSealedState(initialState);

  const composite = useCompositeState({
    orientation,
    ...sealed,
    unstable_virtual: true,
  });
  console.log("%c composite", "color: #cc0088", composite);

  return useSelectBaseState(composite, sealed);
}

export type SelectListState = SelectBaseState<CompositeState>;

export type SelectListActions = SelectBaseActions<CompositeActions>;

export type SelectListInitialState = Omit<
  CompositeInitialState,
  "unstable_virtual"
> &
  SelectBaseInitialState;

export type SelectListStateReturn = SelectListState & SelectListActions;
