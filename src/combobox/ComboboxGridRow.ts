import {
  unstable_GridRowOptions as GridRowOptions,
  unstable_GridRowHTMLProps as GridRowHTMLProps,
  unstable_useGridRow as useGridRow,
} from "reakit";
import { createHook } from "reakit-system/createHook";
import { createComponent } from "reakit-system/createComponent";

import { COMBOBOX_GRID_ROW_KEYS } from "./__keys";

export const useComboboxGridRow = createHook<
  ComboboxGridRowOptions,
  ComboboxGridRowHTMLProps
>({
  name: "ComboboxGridRow",
  compose: useGridRow,
  keys: COMBOBOX_GRID_ROW_KEYS,
});

export const ComboboxGridRow = createComponent({
  as: "div",
  useHook: useComboboxGridRow,
});

export type ComboboxGridRowOptions = GridRowOptions;

export type ComboboxGridRowHTMLProps = GridRowHTMLProps;

export type ComboboxGridRowProps = ComboboxGridRowOptions &
  ComboboxGridRowHTMLProps;
