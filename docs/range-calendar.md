# RangeCalendar

`RangeCalendar` component provides a way to a range of dates while allowing you
to style them however. All the date, month & year calculations are done
internally using
[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html)
to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) for the keyboard
navigaiton & focus management. Support all the features as React Aria's
[useRangeCalendar](https://react-spectrum.adobe.com/react-aria/useRangeCalendar.html#features).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`RangeCalendarOptions`](#rangecalendaroptions)
  - [`RangeCalendarBaseStateProps`](#rangecalendarbasestateprops)
  - [`RangeCalendarStateProps`](#rangecalendarstateprops)

## Usage

```js
import * as React from "react";
import { VisuallyHidden } from "ariakit";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import { ChevronLeft, ChevronRight } from "./Utils.component";
import {
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarNextButton,
  CalendarPreviousButton,
  CalendarTitle,
  RangeCalendar,
  useCalendarCellState,
  useCalendarGridState,
  useRangeCalendarBaseState,
  useRangeCalendarState,
} from "@adaptui/react";

export const RangeCalendarBasic = props => {
  const { locale } = useLocale();

  const state = useRangeCalendarBaseState({ locale, createCalendar, ...props });
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

export default RangeCalendarBasic;

const CalendarGridComp = props => {
  const { state: baseState } = props;
  let { locale } = useLocale();
  let gridState = useCalendarGridState(props);

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

const CalendarCellComp = props => {
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
```

[![Edit CodeSandbox](https://img.shields.io/badge/RangeCalendar-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/32lyyq)
[![Edit CodeSandbox](https://img.shields.io/badge/RangeCalendar%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/hjdxin)

You can customize and style the ranges with CSS attribute selectors

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

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Calendar%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/i9vwkx)
[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Calendar%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/qmjptf)

## Composition

- RangeCalendar uses `Role`
- useRangeCalendarBaseState uses `useRangeCalendarState`
- useRangeCalendarState uses its own state

## Props

### `RangeCalendarOptions`

| Name        | Type                            | Description                                          |
| :---------- | :------------------------------ | :--------------------------------------------------- |
| **`state`** | <code>RangeCalendarState</code> | Object returned by the `useRangeCalendarState` hook. |

### `RangeCalendarBaseStateProps`

| Name                 | Type                                        | Description                                                                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`locale`**         | <code>string</code>                         | The locale to display and edit the value according to.                                                                                                                                                                                                                |
| **`createCalendar`** | <code>(name: string) =&#62; Calendar</code> | A function that creates a [Calendar](../internationalized/date/Calendar.html)object for a given calendar identifier. Such a function may be imported from the`@internationalized/date` package, or manually implemented to include support foronly certain calendars. |

<details><summary>RangeCalendarStateProps props</summary>
> These props are returned by the other props You can also provide these props.

| Name                            | Type                                                         | Description                                                                                                                                 |
| :------------------------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **`visibleDuration`**           | <code>DateDuration \| undefined</code>                       | The amount of days that will be displayed at once. This affects how pagination works.                                                       |
| **`allowsNonContiguousRanges`** | <code>boolean \| undefined</code>                            | When combined with `isDateUnavailable`, determines whether non-contiguous ranges,i.e. ranges containing unavailable dates, may be selected. |
| **`minValue`**                  | <code>DateValue \| undefined</code>                          | The minimum allowed date that a user may select.                                                                                            |
| **`maxValue`**                  | <code>DateValue \| undefined</code>                          | The maximum allowed date that a user may select.                                                                                            |
| **`isDateUnavailable`**         | <code>((date: DateValue) =&#62; boolean) \| undefined</code> | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                    |
| **`isDisabled`**                | <code>boolean \| undefined</code>                            | Whether the calendar is disabled.                                                                                                           |
| **`isReadOnly`**                | <code>boolean \| undefined</code>                            | Whether the calendar value is immutable.                                                                                                    |
| **`autoFocus`**                 | <code>boolean \| undefined</code>                            | Whether to automatically focus the calendar when it mounts.                                                                                 |
| **`focusedValue`**              | <code>DateValue \| undefined</code>                          | Controls the currently focused date within the calendar.                                                                                    |
| **`defaultFocusedValue`**       | <code>DateValue \| undefined</code>                          | The date that is focused when the calendar first mounts (uncountrolled).                                                                    |
| **`onFocusChange`**             | <code>((date: CalendarDate) =&#62; void) \| undefined</code> | Handler that is called when the focused date changes.                                                                                       |
| **`validationState`**           | <code>ValidationState \| undefined</code>                    | Whether the current selection is valid or invalid according to application logic.                                                           |
| **`errorMessage`**              | <code>ReactNode</code>                                       | An error message to display when the selected value is invalid.                                                                             |
| **`value`**                     | <code>T \| undefined</code>                                  | The current value (controlled).                                                                                                             |
| **`defaultValue`**              | <code>T \| undefined</code>                                  | The default value (uncontrolled).                                                                                                           |
| **`onChange`**                  | <code>((value: C) =&#62; void) \| undefined</code>           | Handler that is called when the value changes.                                                                                              |

</details>

### `RangeCalendarStateProps`

| Name        | Type                            | Description                                              |
| :---------- | :------------------------------ | :------------------------------------------------------- |
| **`state`** | <code>RangeCalendarState</code> | Object returned by the `useRangeCalendarBaseState` hook. |
