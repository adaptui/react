import * as React from "react";
import { VisuallyHidden } from "ariakit";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
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

export type CalendarStyledProps = Omit<
  CalendarBaseStateProps,
  "locale" | "createCalendar"
> & {};

export const CalendarStyled: React.FC<CalendarStyledProps> = props => {
  let { locale } = useLocale();

  const state = useCalendarBaseState({ locale, createCalendar, ...props });
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

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(baseState.visibleRange.start, locale);

  return (
    <CalendarGrid state={gridState} className="dates">
      <thead>
        <tr>
          {gridState.weekDays.map((day, index) => {
            return (
              <th key={index}>
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
            {baseState
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCellComp key={i} state={baseState} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </CalendarGrid>
  );
};

export type CalendarCellProps = CalendarCellStateProps & {};

const CalendarCellComp = (props: CalendarCellProps) => {
  const cellState = useCalendarCellState(props);
  const {
    isOutsideVisibleRange,
    isDisabled,
    isSelected,
    isUnavailable,
    formattedDate,
  } = cellState;

  return (
    <CalendarCell state={cellState}>
      <CalendarCellButton
        state={cellState}
        hidden={isOutsideVisibleRange}
        className={`cell ${isSelected ? "selected" : ""} ${
          isDisabled ? "disabled" : ""
        } ${isUnavailable ? "unavailable" : ""}`}
      >
        {formattedDate}
      </CalendarCellButton>
    </CalendarCell>
  );
};
