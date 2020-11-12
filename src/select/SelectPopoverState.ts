import {
  PopoverState,
  PopoverActions,
  PopoverInitialState,
  usePopoverState,
} from "reakit";
import * as React from "react";

import { SelectListStateReturn } from "./SelectListState";

export function useSelectPopoverState<T extends SelectListStateReturn>(
  select: T,
  {
    gutter = 0,
    placement = "bottom-start",
    ...initialState
  }: SelectPopoverInitialState = {},
) {
  const { move, reset, selectedId } = select;
  const popover = usePopoverState({ gutter, placement, ...initialState });
  const visible = popover.visible;

  React.useEffect(() => {
    if (visible && selectedId) {
      move?.(selectedId);
    }

    if (!visible) {
      // We need to reset select.moves
      reset();
    }
  }, [visible, reset, selectedId, move]);

  return {
    ...select,
    ...popover,
    visible,
  };
}

export type SelectPopoverState = PopoverState;

export type SelectPopoverActions = PopoverActions;

export type SelectPopoverInitialState = PopoverInitialState;

export type SelectPopoverStateReturn = SelectPopoverState &
  SelectPopoverActions;
