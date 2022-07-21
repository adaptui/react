# Calendar

`Calendar` component provides a way to select a date or a range of dates while
allowing you to style them however. All the date, month & year calculations are
done internally to provide the ease of use. It follows the
[Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) for the keyboard
navigaiton & focus management.

## Table of Contents

- [Usage](#usage)
  - [Base Calendar](#base-calendar)
  - [Range Calendar](#range-calendar)
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
  - [`RangeCalendarOptions`](#rangecalendaroptions)
  - [`RangeCalendarBaseStateProps`](#rangecalendarbasestateprops)
  - [`RangeCalendarStateProps`](#rangecalendarstateprops)

## Usage

### Base Calendar

```js
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

  const state = useCalendarBaseState({
    locale: locale,
    createCalendar: createCalendar,
    ...props,
  });
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

[![Edit CodeSandbox](https://img.shields.io/badge/Calendar-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/jomxy9)
[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/71qfrc)

### Range Calendar

Converting a normal calendar to a range calendar is as easy as just swaping out
the hook to range calendar hook.

You'll need to import the `useRangeCalendarState` hook from the `@adaptui/react`
first

```diff
- const state = useCalendarBaseState(props);
+ const state = useRangeCalendarBaseState(props);
- const calendar = useCalendarState({ ...props, state });
+ const calendar = useRangeCalendarState({ ...props, state });

return (
-   <Calendar state={calendar}>
+   <RangeCalendar state={calendar}>
      ...
-   </Calendar>
+   </RangeCalendar>
  );
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

[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Calendar-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/xheffs)
[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Calendar%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/sjox17)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ynlty4)
[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/smok6q)

[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20Range%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/0mu0zd)
[![Edit CodeSandbox](https://img.shields.io/badge/Calendar%20Range%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/bt8bhs)

## Composition

- Calendar uses `Role`
- CalendarBaseState uses its own state
- CalendarCell uses `Role`
- CalendarCellButton uses `Role`
- CalendarCellState uses its own state
- CalendarGrid uses `Role`
- CalendarGridState uses its own state
- CalendarNextButton uses `Role`
- CalendarPreviousButton uses `Role`
- CalendarState uses its own state
- CalendarTitle uses `Role`
- RangeCalendar uses `Role`
- RangeCalendarBaseState uses its own state
- RangeCalendarState uses its own state

## Props

### `CalendarOptions`

| Name        | Type                       | Description                                     |
| :---------- | :------------------------- | :---------------------------------------------- |
| **`state`** | <code>CalendarState</code> | Object returned by the `useCalendarState` hook. |

### `CalendarBaseStateProps`

| Name                      | Type                                                                           | Description                                                                                                                                                                                                                                                           |
| :------------------------ | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`minValue`**            | <code>DateValue \| undefined</code>                                            | The minimum allowed date that a user may select.                                                                                                                                                                                                                      |
| **`maxValue`**            | <code>DateValue \| undefined</code>                                            | The maximum allowed date that a user may select.                                                                                                                                                                                                                      |
| **`isDateUnavailable`**   | <code>((date: DateValue) =&#62; boolean) \| undefined</code>                   | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                                                                                                                                              |
| **`isDisabled`**          | <code>boolean \| undefined</code>                                              | Whether the calendar is disabled.                                                                                                                                                                                                                                     |
| **`isReadOnly`**          | <code>boolean \| undefined</code>                                              | Whether the calendar value is immutable.                                                                                                                                                                                                                              |
| **`autoFocus`**           | <code>boolean \| undefined</code>                                              | Whether to automatically focus the calendar when it mounts.                                                                                                                                                                                                           |
| **`focusedValue`**        | <code>DateValue \| undefined</code>                                            | Controls the currently focused date within the calendar.                                                                                                                                                                                                              |
| **`defaultFocusedValue`** | <code>DateValue \| undefined</code>                                            | The date that is focused when the calendar first mounts (uncountrolled).                                                                                                                                                                                              |
| **`onFocusChange`**       | <code>((date: CalendarDate) =&#62; void) \| undefined</code>                   | Handler that is called when the focused date changes.                                                                                                                                                                                                                 |
| **`validationState`**     | <code>ValidationState \| undefined</code>                                      | Whether the current selection is valid or invalid according to application logic.                                                                                                                                                                                     |
| **`errorMessage`**        | <code>ReactNode</code>                                                         | An error message to display when the selected value is invalid.                                                                                                                                                                                                       |
| **`value`**               | <code>T \| undefined</code>                                                    | The current value (controlled).                                                                                                                                                                                                                                       |
| **`defaultValue`**        | <code>T \| undefined</code>                                                    | The default value (uncontrolled).                                                                                                                                                                                                                                     |
| **`onChange`**            | <code>((value: C) =&#62; void) \| undefined</code>                             | Handler that is called when the value changes.                                                                                                                                                                                                                        |
| **`locale`**              | <code>string</code>                                                            | The locale to display and edit the value according to.                                                                                                                                                                                                                |
| **`createCalendar`**      | <code>(name: string) =&#62; Calendar</code>                                    | A function that creates a [Calendar](../internationalized/date/Calendar.html)object for a given calendar identifier. Such a function may be imported from the`@internationalized/date` package, or manually implemented to include support foronly certain calendars. |
| **`visibleDuration`**     | <code>DateDuration \| undefined</code>                                         | The amount of days that will be displayed at once. This affects how pagination works.                                                                                                                                                                                 |
| **`selectionAlignment`**  | <code>&#34;start&#34; \| &#34;center&#34; \| &#34;end&#34; \| undefined</code> | Determines how to align the initial selection relative to the visible date range.                                                                                                                                                                                     |

### `CalendarCellOptions`

| Name        | Type                           | Description                                         |
| :---------- | :----------------------------- | :-------------------------------------------------- |
| **`state`** | <code>CalendarCellState</code> | Object returned by the `useCalendarCellState` hook. |

### `CalendarCellButtonOptions`

| Name        | Type                           | Description                                               |
| :---------- | :----------------------------- | :-------------------------------------------------------- |
| **`state`** | <code>CalendarCellState</code> | Object returned by the `useCalendarCellButtonState` hook. |

### `CalendarCellStateProps`

| Name             | Type                                             | Description                                                                                                                   |
| :--------------- | :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **`date`**       | <code>CalendarDate</code>                        | The date that this cell represents.                                                                                           |
| **`isDisabled`** | <code>boolean \| undefined</code>                | Whether the cell is disabled. By default, this is determined by theCalendar's `minValue`, `maxValue`, and `isDisabled` props. |
| **`state`**      | <code>CalendarState \| RangeCalendarState</code> | Object returned by the `useSliderState` hook.                                                                                 |

### `CalendarGridOptions`

| Name        | Type                          | Description                                         |
| :---------- | :---------------------------- | :-------------------------------------------------- |
| **`state`** | <code>CalendarGridAria</code> | Object returned by the `useCalendarGridState` hook. |

### `CalendarGridStateProps`

| Name            | Type                                             | Description                                                                                                                                                  |
| :-------------- | :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`startDate`** | <code>CalendarDate \| undefined</code>           | The first date displayed in the calendar grid.Defaults to the first visible date in the calendar.Override this to display multiple date grids in a calendar. |
| **`endDate`**   | <code>CalendarDate \| undefined</code>           | The last date displayed in the calendar grid.Defaults to the last visible date in the calendar.Override this to display multiple date grids in a calendar.   |
| **`state`**     | <code>CalendarState \| RangeCalendarState</code> | Object returned by the `useSliderState` hook.                                                                                                                |

### `CalendarNextButtonOptions`

| Name        | Type                                             | Description                                               |
| :---------- | :----------------------------------------------- | :-------------------------------------------------------- |
| **`state`** | <code>CalendarState \| RangeCalendarState</code> | Object returned by the `useCalendarNextButtonState` hook. |

### `CalendarPreviousButtonOptions`

| Name        | Type                                             | Description                                                   |
| :---------- | :----------------------------------------------- | :------------------------------------------------------------ |
| **`state`** | <code>CalendarState \| RangeCalendarState</code> | Object returned by the `useCalendarPreviousButtonState` hook. |

### `CalendarStateProps`

| Name                      | Type                                                         | Description                                                                                              |
| :------------------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **`minValue`**            | <code>DateValue \| undefined</code>                          | The minimum allowed date that a user may select.                                                         |
| **`maxValue`**            | <code>DateValue \| undefined</code>                          | The maximum allowed date that a user may select.                                                         |
| **`isDateUnavailable`**   | <code>((date: DateValue) =&#62; boolean) \| undefined</code> | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. |
| **`isDisabled`**          | <code>boolean \| undefined</code>                            | Whether the calendar is disabled.                                                                        |
| **`isReadOnly`**          | <code>boolean \| undefined</code>                            | Whether the calendar value is immutable.                                                                 |
| **`autoFocus`**           | <code>boolean \| undefined</code>                            | Whether to automatically focus the calendar when it mounts.                                              |
| **`focusedValue`**        | <code>DateValue \| undefined</code>                          | Controls the currently focused date within the calendar.                                                 |
| **`defaultFocusedValue`** | <code>DateValue \| undefined</code>                          | The date that is focused when the calendar first mounts (uncountrolled).                                 |
| **`onFocusChange`**       | <code>((date: CalendarDate) =&#62; void) \| undefined</code> | Handler that is called when the focused date changes.                                                    |
| **`validationState`**     | <code>ValidationState \| undefined</code>                    | Whether the current selection is valid or invalid according to application logic.                        |
| **`errorMessage`**        | <code>ReactNode</code>                                       | An error message to display when the selected value is invalid.                                          |
| **`value`**               | <code>T \| undefined</code>                                  | The current value (controlled).                                                                          |
| **`defaultValue`**        | <code>T \| undefined</code>                                  | The default value (uncontrolled).                                                                        |
| **`onChange`**            | <code>((value: C) =&#62; void) \| undefined</code>           | Handler that is called when the value changes.                                                           |
| **`state`**               | <code>CalendarState</code>                                   | Object returned by the `useSliderState` hook.                                                            |

### `CalendarTitleOptions`

| Name        | Type                       | Description                                          |
| :---------- | :------------------------- | :--------------------------------------------------- |
| **`state`** | <code>CalendarState</code> | Object returned by the `useCalendarTitleState` hook. |

### `RangeCalendarOptions`

| Name        | Type                            | Description                                          |
| :---------- | :------------------------------ | :--------------------------------------------------- |
| **`state`** | <code>RangeCalendarState</code> | Object returned by the `useRangeCalendarState` hook. |

### `RangeCalendarBaseStateProps`

| Name                            | Type                                                         | Description                                                                                                                                                                                                                                                           |
| :------------------------------ | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`allowsNonContiguousRanges`** | <code>boolean \| undefined</code>                            | When combined with `isDateUnavailable`, determines whether non-contiguous ranges,i.e. ranges containing unavailable dates, may be selected.                                                                                                                           |
| **`minValue`**                  | <code>DateValue \| undefined</code>                          | The minimum allowed date that a user may select.                                                                                                                                                                                                                      |
| **`maxValue`**                  | <code>DateValue \| undefined</code>                          | The maximum allowed date that a user may select.                                                                                                                                                                                                                      |
| **`isDateUnavailable`**         | <code>((date: DateValue) =&#62; boolean) \| undefined</code> | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                                                                                                                                              |
| **`isDisabled`**                | <code>boolean \| undefined</code>                            | Whether the calendar is disabled.                                                                                                                                                                                                                                     |
| **`isReadOnly`**                | <code>boolean \| undefined</code>                            | Whether the calendar value is immutable.                                                                                                                                                                                                                              |
| **`autoFocus`**                 | <code>boolean \| undefined</code>                            | Whether to automatically focus the calendar when it mounts.                                                                                                                                                                                                           |
| **`focusedValue`**              | <code>DateValue \| undefined</code>                          | Controls the currently focused date within the calendar.                                                                                                                                                                                                              |
| **`defaultFocusedValue`**       | <code>DateValue \| undefined</code>                          | The date that is focused when the calendar first mounts (uncountrolled).                                                                                                                                                                                              |
| **`onFocusChange`**             | <code>((date: CalendarDate) =&#62; void) \| undefined</code> | Handler that is called when the focused date changes.                                                                                                                                                                                                                 |
| **`validationState`**           | <code>ValidationState \| undefined</code>                    | Whether the current selection is valid or invalid according to application logic.                                                                                                                                                                                     |
| **`errorMessage`**              | <code>ReactNode</code>                                       | An error message to display when the selected value is invalid.                                                                                                                                                                                                       |
| **`value`**                     | <code>T \| undefined</code>                                  | The current value (controlled).                                                                                                                                                                                                                                       |
| **`defaultValue`**              | <code>T \| undefined</code>                                  | The default value (uncontrolled).                                                                                                                                                                                                                                     |
| **`onChange`**                  | <code>((value: C) =&#62; void) \| undefined</code>           | Handler that is called when the value changes.                                                                                                                                                                                                                        |
| **`locale`**                    | <code>string</code>                                          | The locale to display and edit the value according to.                                                                                                                                                                                                                |
| **`createCalendar`**            | <code>(name: string) =&#62; Calendar</code>                  | A function that creates a [Calendar](../internationalized/date/Calendar.html)object for a given calendar identifier. Such a function may be imported from the`@internationalized/date` package, or manually implemented to include support foronly certain calendars. |
| **`visibleDuration`**           | <code>DateDuration \| undefined</code>                       | The amount of days that will be displayed at once. This affects how pagination works.                                                                                                                                                                                 |

### `RangeCalendarStateProps`

| Name                            | Type                                                         | Description                                                                                                                                 |
| :------------------------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
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
| **`state`**                     | <code>RangeCalendarState</code>                              | Object returned by the `useSliderState` hook.                                                                                               |
