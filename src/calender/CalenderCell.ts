import { createHook, createComponent } from "reakit-system";
import { format, isSameDay, isWeekend } from "date-fns";
import { callAllHandlers } from "@chakra-ui/utils";
import {
  unstable_useGridCell as useGridCell,
  unstable_GridCellProps as GridCellProps,
  unstable_GridCellHTMLProps as GridCellHTMLProps,
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
  compose: useGridCell,
  keys: CALENDER_CELL_KEYS,

  useProps(
    { selectedDate, setSelectedDate, date },
    { disabled, ...htmlProps },
  ) {
    const handleSelected = () => {
      setSelectedDate && setSelectedDate(date);
    };
    return {
      onClick: callAllHandlers(handleSelected, htmlProps.onClick),
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
