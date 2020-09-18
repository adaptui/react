import { createHook, createComponent } from "reakit-system";
import { format, isSameDay, isWeekend } from "date-fns";
import { createOnKeyDown } from "reakit-utils";
import {
  unstable_useGridCell as useGridCell,
  unstable_GridCellProps as GridCellProps,
  unstable_GridCellHTMLProps as GridCellHTMLProps,
  useCompositeItem,
} from "reakit";

import { CALENDER_CELL_KEYS } from "./__keys";
import { CalenderStateReturn } from "./CalenderState";

export type CalenderCellOptions = GridCellProps &
  Pick<
    CalenderStateReturn,
    | "selectedDate"
    | "setSelectedDate"
    | "nextYear"
    | "nextMonth"
    | "previousYear"
    | "previousMonth"
  > & {
    date: Date;
  };

export type CalenderCellHTMLProps = GridCellHTMLProps;

export type CalenderCellProps = CalenderCellOptions & CalenderCellHTMLProps;

export const useCalenderCell = createHook<
  CalenderCellOptions,
  CalenderCellHTMLProps
>({
  name: "CalenderCell",
  compose: [useGridCell, useCompositeItem],
  keys: CALENDER_CELL_KEYS,

  useProps(
    {
      selectedDate,
      setSelectedDate,
      date,
      nextYear,
      nextMonth,
      previousYear,
      previousMonth,
    },
    { disabled, ...htmlProps },
  ) {
    return {
      onClick: () => {
        setSelectedDate && setSelectedDate(date);
      },
      "aria-label": date && format(date, "do MMM yyyy"),
      "data-selected": isSameDay(selectedDate, date),
      "data-weekend": isWeekend(date),
      ...htmlProps,
    };
  },
});

export const CalenderCell = createComponent({
  as: "td",
  useHook: useCalenderCell,
});
