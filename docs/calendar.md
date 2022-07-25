# Calendar

`Calendar` component provides a way to select a date while allowing you to style
them however. All the date, month & year calculations are done internally using
[@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html)
to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) for the keyboard
navigaiton & focus management. Supports all the features as React Aria's
[useCalendar](https://react-spectrum.adobe.com/react-aria/useCalendar.html#features).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`CalendarOptions`](#calendaroptions)
  - [`CalendarBaseStateProps`](#calendarbasestateprops)
  - [`CalendarCellOptions`](#calendarcelloptions)
  - [`CalendarCellButtonOptions`](#calendarcellbuttonoptions)
  - [`CalendarCellStateProps`](#calendarcellstateprops)
  - [`CalendarGridOptions`](#calendargridoptions)
  - [`CalendarGridStateProps`](#calendargridstateprops)
  - [`CalendarNextButtonOptions`](#calendarnextbuttonoptions)
  - [`CalendarPreviousButtonOptions`](#calendarpreviousbuttonoptions)
  - [`CalendarStateProps`](#calendarstateprops)
  - [`CalendarTitleOptions`](#calendartitleoptions)

## Usage

```js
import * as React from "react";
import { VisuallyHidden } from "ariakit";
import { createCalendar, getWeeksInMonth } from "@internationalized/date";
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
  let { locale } = useLocale();

  const state = useCalendarBaseState({ locale, createCalendar, ...props });
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

[![Edit CodeSandbox](https://img.shields.io/badge/Calendar-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/zr2dki)
[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/9x3skk)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/le2yec)
[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/zym3nq)

## Composition

- Calendar uses `Role`
- useCalendarBaseState uses `useCalendarState`
- CalendarCell uses `Role`
- CalendarCellButton uses `Role`
- useCalendarCellState uses its own state
- CalendarGrid uses `Role`
- useCalendarGridState uses its own state
- CalendarNextButton uses `Role`
- CalendarPreviousButton uses `Role`
- useCalendarState uses its own state
- CalendarTitle uses `Role`

## Props

### `CalendarOptions`

| Name        | Type                      | Description                                     |
| :---------- | :------------------------ | :---------------------------------------------- |
| **`state`** | <code>CalendarAria</code> | Object returned by the `useCalendarState` hook. |

### `CalendarBaseStateProps`

| Name                 | Type                                        | Description                                                                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`locale`**         | <code>string</code>                         | The locale to display and edit the value according to.                                                                                                                                                                                                                |
| **`createCalendar`** | <code>(name: string) =&#62; Calendar</code> | A function that creates a [Calendar](../internationalized/date/Calendar.html)object for a given calendar identifier. Such a function may be imported from the`@internationalized/date` package, or manually implemented to include support foronly certain calendars. |

<details><summary>CalendarStateProps props</summary>
> These props are returned by the other props You can also provide these props.

| Name                      | Type                                                                           | Description                                                                                              |
| :------------------------ | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **`visibleDuration`**     | <code>DateDuration \| undefined</code>                                         | The amount of days that will be displayed at once. This affects how pagination works.                    |
| **`selectionAlignment`**  | <code>&#34;start&#34; \| &#34;center&#34; \| &#34;end&#34; \| undefined</code> | Determines how to align the initial selection relative to the visible date range.                        |
| **`minValue`**            | <code>DateValue \| undefined</code>                                            | The minimum allowed date that a user may select.                                                         |
| **`maxValue`**            | <code>DateValue \| undefined</code>                                            | The maximum allowed date that a user may select.                                                         |
| **`isDateUnavailable`**   | <code>((date: DateValue) =&#62; boolean) \| undefined</code>                   | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. |
| **`isDisabled`**          | <code>boolean \| undefined</code>                                              | Whether the calendar is disabled.                                                                        |
| **`isReadOnly`**          | <code>boolean \| undefined</code>                                              | Whether the calendar value is immutable.                                                                 |
| **`autoFocus`**           | <code>boolean \| undefined</code>                                              | Whether to automatically focus the calendar when it mounts.                                              |
| **`focusedValue`**        | <code>DateValue \| undefined</code>                                            | Controls the currently focused date within the calendar.                                                 |
| **`defaultFocusedValue`** | <code>DateValue \| undefined</code>                                            | The date that is focused when the calendar first mounts (uncountrolled).                                 |
| **`onFocusChange`**       | <code>((date: CalendarDate) =&#62; void) \| undefined</code>                   | Handler that is called when the focused date changes.                                                    |
| **`validationState`**     | <code>ValidationState \| undefined</code>                                      | Whether the current selection is valid or invalid according to application logic.                        |
| **`errorMessage`**        | <code>ReactNode</code>                                                         | An error message to display when the selected value is invalid.                                          |
| **`value`**               | <code>T \| undefined</code>                                                    | The current value (controlled).                                                                          |
| **`defaultValue`**        | <code>T \| undefined</code>                                                    | The default value (uncontrolled).                                                                        |
| **`onChange`**            | <code>((value: C) =&#62; void) \| undefined</code>                             | Handler that is called when the value changes.                                                           |

</details>

### `CalendarCellOptions`

| Name        | Type                           | Description                                         |
| :---------- | :----------------------------- | :-------------------------------------------------- |
| **`state`** | <code>CalendarCellState</code> | Object returned by the `useCalendarCellState` hook. |

### `CalendarCellButtonOptions`

| Name        | Type                           | Description                                         |
| :---------- | :----------------------------- | :-------------------------------------------------- |
| **`state`** | <code>CalendarCellState</code> | Object returned by the `useCalendarCellState` hook. |

### `CalendarCellStateProps`

| Name        | Type                                             | Description                                   |
| :---------- | :----------------------------------------------- | :-------------------------------------------- | ------------------------------ |
| **`date`**  | <code>CalendarDate</code>                        | The date that this cell represents.           |
| **`state`** | <code>CalendarState \| RangeCalendarState</code> | Object returned by the `useCalendarBaseState` | `RangeCalendarBaseState` hook. |

### `CalendarGridOptions`

| Name        | Type                          | Description                                         |
| :---------- | :---------------------------- | :-------------------------------------------------- |
| **`state`** | <code>CalendarGridAria</code> | Object returned by the `useCalendarGridState` hook. |

### `CalendarGridStateProps`

| Name            | Type                                             | Description                                                                                                                                                  |
| :-------------- | :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **`startDate`** | <code>CalendarDate \| undefined</code>           | The first date displayed in the calendar grid.Defaults to the first visible date in the calendar.Override this to display multiple date grids in a calendar. |
| **`endDate`**   | <code>CalendarDate \| undefined</code>           | The last date displayed in the calendar grid.Defaults to the last visible date in the calendar.Override this to display multiple date grids in a calendar.   |
| **`state`**     | <code>CalendarState \| RangeCalendarState</code> | Object returned by the `useCalendarBaseState`                                                                                                                | `RangeCalendarBaseState` hook. |

### `CalendarNextButtonOptions`

| Name        | Type                                            | Description                               |
| :---------- | :---------------------------------------------- | :---------------------------------------- | -------------------------- |
| **`state`** | <code>CalendarAria \| RangeCalendarState</code> | Object returned by the `useCalendarState` | `RangeCalendarState` hook. |

### `CalendarPreviousButtonOptions`

| Name        | Type                                            | Description                               |
| :---------- | :---------------------------------------------- | :---------------------------------------- | -------------------------- |
| **`state`** | <code>CalendarAria \| RangeCalendarState</code> | Object returned by the `useCalendarState` | `RangeCalendarState` hook. |

### `CalendarStateProps`

| Name        | Type                       | Description                                         |
| :---------- | :------------------------- | :-------------------------------------------------- |
| **`state`** | <code>CalendarState</code> | Object returned by the `useCalendarBaseState` hook. |

### `CalendarTitleOptions`

| Name        | Type                      | Description                                     |
| :---------- | :------------------------ | :---------------------------------------------- |
| **`state`** | <code>CalendarAria</code> | Object returned by the `useCalendarState` hook. |
