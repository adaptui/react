import * as React from "react";
import { VisuallyHidden } from "ariakit";
import {
  createCalendar,
  getWeeksInMonth,
  startOfWeek,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  Calendar,
  CalendarBaseStateProps,
  CalendarCell,
  CalendarCellButton,
  CalendarCellStateProps,
  CalendarGrid,
  CalendarGridStateProps,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  useCalendarBaseState,
  useCalendarCellState,
  useCalendarGridState,
  useCalendarState,
} from "../../index";

import { ChevronLeft, ChevronRight } from "./Utils.component";

import "./CalendarStyled.css";

export type CalendarStyledProps = Omit<
  CalendarBaseStateProps,
  "locale" | "createCalendar"
> & {};

export const CalendarStyled: React.FC<CalendarStyledProps> = props => {
  const { locale } = useLocale();
  const state = useCalendarBaseState({ ...props, locale, createCalendar });
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
                <VisuallyHidden>{day}</VisuallyHidden>
                <span aria-hidden="true">{day}</span>
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
