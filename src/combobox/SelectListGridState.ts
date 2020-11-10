import * as React from "react";
import {
  SealedInitialState,
  useSealedState,
} from "reakit-utils/useSealedState";
import { SetState } from "reakit-utils/types";
import {
  unstable_useGridState as useGridState,
  unstable_GridState as GridState,
  unstable_GridActions as GridActions,
  unstable_GridInitialState as GridInitialState,
} from "reakit";

import {
  useSelectBaseState,
  SelectBaseState,
  SelectBaseActions,
  SelectBaseInitialState,
} from "./SelectBaseState";

export function useSelectListGridState(
  initialState: SealedInitialState<SelectListGridInitialState> = {},
): SelectListGridStateReturn {
  const {
    columns: initialColumns = 1,
    currentId = null,
    loop = true,
    ...sealed
  } = useSealedState(initialState);

  const [columns, setColumns] = React.useState(initialColumns);

  const grid = useGridState({
    currentId,
    loop,
    ...sealed,
    unstable_virtual: true,
  });
  const select = useSelectBaseState(grid, sealed);

  return {
    ...select,
    menuRole: "grid",
    columns,
    setColumns,
  };
}

export type SelectListGridState = Omit<
  SelectBaseState<GridState>,
  "matches"
> & {
  /**
   * Number of columns by which `values` will be splitted to generate the
   * `matches` 2D array.
   */
  columns: number;
};

export type SelectListGridActions = SelectBaseActions<GridActions> & {
  /**
   * Sets `columns`.
   */
  setColumns: SetState<SelectListGridState["columns"]>;
};

export type SelectListGridInitialState = Omit<
  GridInitialState,
  "unstable_virtual"
> &
  SelectBaseInitialState &
  Pick<Partial<SelectListGridState>, "columns">;

export type SelectListGridStateReturn = SelectListGridState &
  SelectListGridActions;
