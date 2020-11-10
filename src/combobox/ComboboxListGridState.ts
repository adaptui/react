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
  useComboboxBaseState,
  ComboboxBaseState,
  ComboboxBaseActions,
  ComboboxBaseInitialState,
} from "./ComboboxBaseState";

function chunk<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function useComboboxListGridState(
  initialState: SealedInitialState<ComboboxListGridInitialState> = {},
): ComboboxListGridStateReturn {
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
  const combobox = useComboboxBaseState(grid, sealed);

  const matches = React.useMemo(() => chunk(combobox.matches, columns), [
    combobox.matches,
    columns,
  ]);

  return {
    ...combobox,
    menuRole: "grid",
    columns,
    matches,
    setColumns,
  };
}

export type ComboboxListGridState = Omit<
  ComboboxBaseState<GridState>,
  "matches"
> & {
  /**
   * Number of columns by which `values` will be splitted to generate the
   * `matches` 2D array.
   */
  columns: number;
  /**
   * Result of filtering `values` based on `inputValue`.
   * @default []
   * @example
   * const combobox = useComboboxState({
   *   values: ["Red", "Green", "Blue"],
   *   columns: 2,
   * });
   * combobox.matches; // [["Red", "Green"], ["Blue"]]
   * combobox.setInputValue("g");
   * // On next render
   * combobox.matches; // [["Green"]]
   */
  matches: string[][];
};

export type ComboboxListGridActions = ComboboxBaseActions<GridActions> & {
  /**
   * Sets `columns`.
   */
  setColumns: SetState<ComboboxListGridState["columns"]>;
};

export type ComboboxListGridInitialState = Omit<
  GridInitialState,
  "unstable_virtual"
> &
  ComboboxBaseInitialState &
  Pick<Partial<ComboboxListGridState>, "columns">;

export type ComboboxListGridStateReturn = ComboboxListGridState &
  ComboboxListGridActions;
