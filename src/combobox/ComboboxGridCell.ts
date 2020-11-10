import {
  unstable_GridCellOptions as GridCellOptions,
  unstable_GridCellHTMLProps as GridCellHTMLProps,
  unstable_useGridCell as useGridCell,
} from "reakit";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";

import { COMBOBOX_GRID_CELL_KEYS } from "./__keys";
import {
  ComboboxItemOptions,
  ComboboxItemHTMLProps,
  useComboboxItem,
} from "./ComboboxItem";

export const useComboboxGridCell = createHook<
  ComboboxGridCellOptions,
  ComboboxGridCellHTMLProps
>({
  name: "ComboboxGridCell",
  compose: [useComboboxItem, useGridCell],
  keys: COMBOBOX_GRID_CELL_KEYS,
});

export const ComboboxGridCell = createComponent({
  as: "span",
  memo: true,
  useHook: useComboboxGridCell,
});

export type ComboboxGridCellOptions = GridCellOptions & ComboboxItemOptions;

export type ComboboxGridCellHTMLProps = GridCellHTMLProps &
  ComboboxItemHTMLProps;

export type ComboboxGridCellProps = ComboboxGridCellOptions &
  ComboboxGridCellHTMLProps;
