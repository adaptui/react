import { createHook, createComponent } from "reakit-system";
import {
  unstable_useGridRow as useGridRow,
  unstable_GridRowProps as GridRowProps,
  unstable_GridRowHTMLProps as GridRowHTMLProps,
} from "reakit";

import { CALENDER_ROW_KEYS } from "./__keys";

export type CalenderRowOptions = GridRowProps;

export type CalenderRowHTMLProps = GridRowHTMLProps;

export type CalenderRowProps = CalenderRowOptions & CalenderRowHTMLProps;

export const useCalenderRow = createHook<
  CalenderRowOptions,
  CalenderRowHTMLProps
>({
  name: "CalenderRow",
  compose: useGridRow,
  keys: CALENDER_ROW_KEYS,

  useProps(_, { ...htmlProps }) {
    return { ...htmlProps };
  },
});

export const CalenderRow = createComponent({
  as: "tr",
  useHook: useCalenderRow,
});
