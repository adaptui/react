import {
  PopoverState,
  PopoverActions,
  PopoverInitialState,
  usePopoverState,
} from "reakit";
import * as React from "react";

import { SelectListStateReturn } from "./SelectListState";
import { SelectListGridStateReturn } from "./SelectListGridState";

export function useSelectPopoverState<
  T extends SelectListStateReturn | SelectListGridStateReturn
>(
  select: T,
  {
    gutter = 0,
    placement = "bottom-start",
    ...initialState
  }: SelectPopoverInitialState = {},
) {
  // const { reset } = select;
  const popover = usePopoverState({ gutter, placement, ...initialState });
  // const visible = popover.visible && inputValue.length >= minValueLength;
  // const visible = popover.visible;

  // React.useEffect(() => {
  //   if (!visible) {
  //     // We need to reset select.moves
  //     reset();
  //   }
  // }, [visible, reset]);

  return {
    ...select,
    ...popover,
    // visible,
  };
}

export type SelectPopoverState = PopoverState;

export type SelectPopoverActions = PopoverActions;

export type SelectPopoverInitialState = PopoverInitialState;

export type SelectPopoverStateReturn = SelectPopoverState &
  SelectPopoverActions;
