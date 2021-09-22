import * as React from "react";
import {
  PopoverActions,
  PopoverInitialState,
  PopoverState,
  usePopoverState,
} from "reakit";

import { SelectListStateReturn } from "./SelectListState";

export function useSelectPopoverState(
  select: SelectListStateReturn,
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
    if (visible && selectedId) move?.(selectedId);

    // We need to reset select.moves
    if (!visible) reset();
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
