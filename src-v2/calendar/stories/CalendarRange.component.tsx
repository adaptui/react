import * as React from "react";
import { getWeeksInMonth, startOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { VisuallyHidden } from "ariakit";

import {
  CalendarCell,
  CalendarCellButton,
  CalendarCellStateProps,
  CalendarGrid,
  CalendarGridStateProps,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  RangeCalendar,
  RangeCalendarBaseStateProps,
  useCalendarCellState,
  useCalendarGridState,
  useRangeCalendarBaseState,
  useRangeCalendarState,
} from "../../index";

import { ChevronLeft, ChevronRight } from "./Utils.component";

export type CalendarRangeProps = RangeCalendarBaseStateProps & {};

export const CalendarRange: React.FC<CalendarRangeProps> = props => {
  const state = useRangeCalendarBaseState(props);
  const calendar = useRangeCalendarState({ ...props, state });

  return (
    <RangeCalendar state={calendar} className="calendar-range">
      <div className="header">
        <CalendarPreviousButton state={calendar} className="prev-month">
          <ChevronLeft />
        </CalendarPreviousButton>
        <CalendarTitle state={calendar} />
        <CalendarNextButton state={calendar} className="next-month">
          <ChevronRight />
        </CalendarNextButton>
      </div>
      <CalendarGridComp state={state} />
    </RangeCalendar>
  );
};

export default CalendarRange;

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
    <CalendarGrid state={gridState} className="dates">
      <thead>
        <tr>
          {gridState.weekDays.map((day, index) => {
            return (
              <th key={index}>
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
    <CalendarCell state={state}>
      <CalendarCellButton
        state={state}
        hidden={state.isOutsideVisibleRange}
        className={`cell ${state.isSelected ? "selected" : ""} ${
          state.isDisabled ? "disabled" : ""
        } ${state.isUnavailable ? "unavailable" : ""}`}
      >
        {state.formattedDate}
      </CalendarCellButton>
    </CalendarCell>
  );
};