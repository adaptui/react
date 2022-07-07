# Calendar

`Calendar` component provides a way to select a date or a range of dates while
allowing you to style them however. All the date, month & year calculations are
done internally to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#grid) for the
keyboard navigaiton & focus management.

## Table of Contents

- [Usage](#usage)
  - [Base Calendar](#base-calendar)
  - [Range Calendar](#range-calendar)

## Usage

### Base Calendar

```js
import * as React from "react";
import { VisuallyHidden } from "ariakit";
import { getWeeksInMonth, startOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  Calendar,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  useCalendarBaseState,
  useCalendarCellState,
  useCalendarGridState,
  useCalendarState,
} from "@adaptui/react";

import { ChevronLeft, ChevronRight } from "./Utils.component";

export const CalendarBasic = props => {
  const state = useCalendarBaseState(props);
  const calendar = useCalendarState({ ...props, state });

  return (
    <Calendar state={calendar} className="calendar">
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
    </Calendar>
  );
};

export default CalendarBasic;

const CalendarGridComp = props => {
  const { state: baseState } = props;
  let { locale } = useLocale();
  let gridState = useCalendarGridState(props);

  let monthStart = startOfWeek(baseState.visibleRange.start, locale);
  let weeksInMonth = getWeeksInMonth(baseState.visibleRange.start, locale);

  return (
    <CalendarGrid state={gridState} className="dates">
      <thead>
        <tr>
          {gridState.weekDays.map((day, index) => {
            return (
              <th key={index}>
                {}
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

const CalendarCellComp = props => {
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
```

### Range Calendar

Converting a normal calendar to a range calendar is as easy as just swaping out
the hook to range calendar hook.

You'll need to import the `useRangeCalendarState` hook from the `@adaptui/react`
first

```diff
- const state = useCalendarState(props);
+ const state = useRangeCalendarState(props);
```

Also we can customize and style the ranges with CSS attribute selectors

```css
[data-is-range-selection] > span {
  /* styles for any cells between start-end (inclusive) */
}
[data-is-selection-start] > span {
  /* styles for first selected range cell */
}
[data-is-selection-end] > span {
  /* styles for end selected range cell */
}

/* only applied if cell date is first or last of the month*/
[data-is-range-start] > span {
  /**/
}
[data-is-range-end] > span {
  /**/
}
```

[![Edit CodeSandbox](https://img.shields.io/badge/Calendar-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/gedjf2)

[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Calendar-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/8b5irn)

## Composition

- Calendar uses
- CalendarCell uses
- CalendarCellButton uses
- CalendarGrid uses
- CalendarNextButton uses
- CalendarPreviousButton uses
- CalendarTitle uses
- RangeCalendar uses

<!-- INJECT_PROPS src/calendar -->
