import {
  PopoverInitialState,
  usePopoverState,
  useCompositeState,
  CompositeInitialState,
} from "reakit";

import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";

export type PickerInitialState = CompositeInitialState & PopoverInitialState;

export function usePickerState(
  initialState: SealedInitialState<PickerInitialState> = {},
) {
  const { placement = "bottom", gutter = 0, ...sealed } = useSealedState(
    initialState,
  );

  const composite = useCompositeState({ ...sealed });

  const popover = usePopoverState({
    ...sealed,
    placement,
    gutter,
  });

  return {
    ...composite,
    ...popover,
  };
}

export type UsePickerStateReturn = ReturnType<typeof usePickerState>;
