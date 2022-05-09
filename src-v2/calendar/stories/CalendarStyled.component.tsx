import * as React from "react";
import { getWeeksInMonth, startOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { VisuallyHidden } from "ariakit";

import {
  Calendar,
  CalendarBaseStateProps,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarGridStateProps,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  useCalendarBaseState,
  useCalendarState,
} from "../../index";
import {
  CalendarCellStateProps,
  useCalendarCellState,
} from "../calendar-cell-state";
import { useCalendarGridState } from "../calendar-grid-state";

import { ChevronLeft, ChevronRight } from "./Utils.component";

export type CalendarStyledProps = CalendarBaseStateProps & {};

export const CalendarStyled: React.FC<CalendarStyledProps> = props => {
  const state = useCalendarBaseState(props);
  const calendar = useCalendarState({ ...props, state });

  return (
    <Calendar
      state={calendar}
      className="p-3 bg-white rounded-md shadow-lg styled-datepicker calendar w-max"
    >
      <div className="flex justify-between">
        <CalendarPreviousButton
          state={calendar}
          className="text-gray-700 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-border-400"
        >
          <ChevronLeft className="flex-shrink-0 w-4" />
        </CalendarPreviousButton>
        <CalendarTitle
          state={calendar}
          className="text-sm font-bold text-gray-700 px-2 py-1"
        />
        <CalendarNextButton
          state={calendar}
          className="text-gray-700 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-border-400"
        >
          <ChevronRight className="flex-shrink-0 w-4" />
        </CalendarNextButton>
      </div>
      <CalendarGridComp state={state} />
    </Calendar>
  );
};

export default CalendarStyled;

export type CalendarGridProps = CalendarGridStateProps & {};

const CalendarGridComp = (props: CalendarGridProps) => {
  const { state: baseState } = props;
  let { locale } = useLocale();
  let gridState = useCalendarGridState(props);

  // Find the start date of the grid, which is the beginning
  // of the week the month starts in. Also get the number of
  // weeks in the month so we can render the proper number of rows.
  let monthStart = startOfWeek(baseState.visibleRange.start, locale);
  let weeksInMonth = getWeeksInMonth(baseState.visibleRange.start, locale);

  return (
    <CalendarGrid state={gridState} className="p-4 mt-2">
      <thead>
        <tr className="text-center">
          {gridState.weekDays.map((day, index) => {
            return (
              <th
                key={index}
                className="font-light text-gray-500 calendar__cell"
              >
                {/* Make sure screen readers read the full day name,
                  but we show an abbreviation visually. */}
                <VisuallyHidden>{day.long}</VisuallyHidden>
                <span aria-hidden="true">{day.narrow}</span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map(weekIndex => (
          <tr key={weekIndex}>
            {[...new Array(7).keys()].map(dayIndex => (
              <CalendarCellComp
                key={dayIndex}
                state={baseState}
                date={monthStart.add({ weeks: weekIndex, days: dayIndex })}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </CalendarGrid>
  );
};

export type CalendarCellProps = CalendarCellStateProps & {};

const CalendarCellComp = (props: CalendarCellProps) => {
  const state = useCalendarCellState(props);

  return (
    <CalendarCell state={state} className="calendar__cell">
      <CalendarCellButton
        state={state}
        hidden={state.isOutsideVisibleRange}
        className={`p-2 cell ${state.isSelected ? "selected" : ""} ${
          state.isDisabled ? "disabled" : ""
        } ${state.isUnavailable ? "unavailable" : ""}`}
      >
        {state.formattedDate}
      </CalendarCellButton>
    </CalendarCell>
  );
};