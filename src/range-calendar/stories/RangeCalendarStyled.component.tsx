import * as React from "react";
import { VisuallyHidden } from "ariakit";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  ChevronLeft,
  ChevronRight,
} from "../../calendar/stories/Utils.component";
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

import "./RangeCalendarStyled.css";

export type RangeCalendarStyledProps = Omit<
  RangeCalendarBaseStateProps,
  "locale" | "createCalendar"
> & {};

export const RangeCalendarStyled: React.FC<
  RangeCalendarStyledProps
> = props => {
  let { locale } = useLocale();

  const state = useRangeCalendarBaseState({ locale, createCalendar, ...props });
  const calendar = useRangeCalendarState({ ...props, state });

  return (
    <RangeCalendar state={calendar} className="rangecalendar">
      <div className="rangecalendar--wrapper">
        <CalendarPreviousButton
          state={calendar}
          className="rangecalendar__button"
        >
          <ChevronLeft className="rangecalendar__button_chevron" />
        </CalendarPreviousButton>
        <CalendarTitle state={calendar} className="rangecalendar__title" />
        <CalendarNextButton state={calendar} className="rangecalendar__button">
          <ChevronRight className="rangecalendar__button_chevron" />
        </CalendarNextButton>
      </div>
      <CalendarGridComp state={state} />
    </RangeCalendar>
  );
};

export default RangeCalendarStyled;

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
