## Calendar

Accessible `Calendar` component.

[Calendar - Open On Sandbox](https://codesandbox.io/s/pmtcs)

# Props

<!-- Automatically generated -->

### `useCalendarState`

- **`value`** <code>T | undefined</code> The current value (controlled).
- **`defaultValue`** <code>T | undefined</code> The default value
  (uncontrolled).
- **`onChange`** <code>((value: T) =&#62; void) | undefined</code> Handler that
  is called when the value changes.
- **`minValue`** <code>T | undefined</code> The smallest value allowed.
- **`maxValue`** <code>T | undefined</code> The largest value allowed.
- **`isDisabled`** <code>boolean | undefined</code> Whether the input is
  disabled.
- **`isReadOnly`** <code>boolean | undefined</code> Whether the input can be
  selected but not changed by the user.
- **`autoFocus`** <code>boolean | undefined</code> Whether the element should
  receive focus on render.
- **`id`** <code>string | undefined</code> Id for the calendar grid

### `useRangeCalendarState`

- **`value`** <code>T | undefined</code> The current value (controlled).
- **`defaultValue`** <code>T | undefined</code> The default value
  (uncontrolled).
- **`onChange`** <code>((value: T) =&#62; void) | undefined</code> Handler that
  is called when the value changes.
- **`minValue`** <code>T | undefined</code> The smallest value allowed.
- **`maxValue`** <code>T | undefined</code> The largest value allowed.
- **`isDisabled`** <code>boolean | undefined</code> Whether the input is
  disabled.
- **`isReadOnly`** <code>boolean | undefined</code> Whether the input can be
  selected but not changed by the user.
- **`autoFocus`** <code>boolean | undefined</code> Whether the element should
  receive focus on render.
- **`id`** <code>string | undefined</code> Id for the calendar grid

### `Calendar`

<details><summary>1 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`calendarId`** <code>string | undefined</code> Id for the Calendar Header

</details>

### `CalendarButton`

- **`goto`**
  <code title="&#34;nextMonth&#34; | &#34;previousMonth&#34; | &#34;nextYear&#34; | &#34;previousYear&#34;">&#34;nextMonth&#34;
  | &#34;previousMonth&#34; | &#34;nextYear&#34; | &#34;p...</code>

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>4 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`focusNextMonth`** <code>() =&#62; void</code> Focus the cell one month next
  to the current date
- **`focusPreviousMonth`** <code>() =&#62; void</code> Focus the cell one month
  prev to the current date
- **`focusPreviousYear`** <code>() =&#62; void</code> Focus the cell of the date
  one year before the current date
- **`focusNextYear`** <code>() =&#62; void</code> Focus the cell of the date one
  year from the current date

</details>

### `CalendarCell`

- **`date`** <code>Date</code>

<details><summary>6 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`dateValue`** <code>Date</code> Selected Date value
- **`isDisabled`** <code>boolean</code> `true` if the calendar is disabled
- **`currentMonth`** <code>Date</code> Month of the current Date
- **`isRangeCalendar`** <code>boolean</code> `true` if the calendar is used as
  RangeCalendar
- **`highlightDate`** <code>(date: Date) =&#62; void</code>

- **`highlightedRange`** <code>RangeValue&#60;Date&#62; | null</code>

</details>

### `CalendarCellButton`

- **`date`** <code>Date</code>

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>11 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`dateValue`** <code>Date</code> Selected Date value
- **`isDisabled`** <code>boolean</code> `true` if the calendar is disabled
- **`isRangeCalendar`** <code>boolean</code> `true` if the calendar is used as
  RangeCalendar
- **`focusedDate`** <code>Date</code> Date value that is currently focused
- **`selectDate`** <code>(value: Date) =&#62; void</code> sets `dateValue`
- **`setFocusedDate`** <code>(value: SetStateAction&#60;Date&#62;) =&#62;
  void</code> Sets `focusedDate`
- **`month`** <code>number</code> Month of the current date value
- **`minDate`** <code>Date | undefined</code> Minimum allowed Date value
- **`maxDate`** <code>Date | undefined</code> Maximum allowed Date value
- **`isFocused`** <code>boolean</code> `true` if the calendar is focused
- **`anchorDate`** <code>Date | null</code>

</details>

### `CalendarGrid`

<details><summary>17 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`calendarId`** <code>string | undefined</code> Id for the Calendar Header
- **`focusNextMonth`** <code>() =&#62; void</code> Focus the cell one month next
  to the current date
- **`focusPreviousMonth`** <code>() =&#62; void</code> Focus the cell one month
  prev to the current date
- **`focusPreviousYear`** <code>() =&#62; void</code> Focus the cell of the date
  one year before the current date
- **`focusNextYear`** <code>() =&#62; void</code> Focus the cell of the date one
  year from the current date
- **`isDisabled`** <code>boolean</code> `true` if the calendar is disabled
- **`isRangeCalendar`** <code>boolean</code> `true` if the calendar is used as
  RangeCalendar
- **`isReadOnly`** <code>boolean</code> `true` if the calendar is only readonly
- **`setFocused`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `isFocused`
- **`selectFocusedDate`** <code>() =&#62; void</code> Selects the `focusedDate`
- **`focusEndOfMonth`** <code>() =&#62; void</code> Focus the cell of the last
  day of the month
- **`focusStartOfMonth`** <code>() =&#62; void</code> Focus the cell of the
  first day of the month
- **`focusNextDay`** <code>() =&#62; void</code> Focus the cell next to the
  current date
- **`focusPreviousDay`** <code>() =&#62; void</code> Focus the cell prev to the
  current date
- **`focusNextWeek`** <code>() =&#62; void</code> Focus the cell one week next
  to the current date
- **`focusPreviousWeek`** <code>() =&#62; void</code> Focus the cell one week
  prev to the current date
- **`setAnchorDate`** <code>(value: SetStateAction&#60;Date | null&#62;) =&#62;
  void</code>

</details>

### `CalendarHeader`

- **`format`** <code>DateTimeFormatOpts | undefined</code>

<details><summary>2 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`calendarId`** <code>string | undefined</code> Id for the Calendar Header
- **`currentMonth`** <code>Date</code> Month of the current Date

</details>

### `CalendarWeekTitle`

- **`dayIndex`** <code>number</code>

<details><summary>1 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`weekDays`** <code>{ title: string; abbr: string; }[]</code> Generated week
  days for CalendarWeekTitle based on weekStart

</details>

# Composition

- Calendar uses [useBox](https://reakit.io/docs/box)
- CalendarButton uses [useButton](https://reakit.io/docs/button)
- CalendarCell uses [useBox](https://reakit.io/docs/box)
- CalendarCellButton uses [useButton](https://reakit.io/docs/button)
- CalendarGrid uses [useBox](https://reakit.io/docs/box)
- CalendarHeader uses [useBox](https://reakit.io/docs/box)
- CalendarWeekTitle uses [useBox](https://reakit.io/docs/box)

### Example

#### Base Calendar

```js
import React from "react";

import {
  useCalendarState,
  Calendar as CalendarWrapper,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarWeekTitle,
} from "renderless-components";

export const App = props => {
  const state = useCalendarState(props);

  return (
    <CalendarWrapper {...state} className="calendar">
      <div className="header">
        <CalendarButton {...state} goto="previousYear" className="prev-year">
          <DoubleChevronLeft />
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth" className="prev-month">
          <ChevronLeft />
        </CalendarButton>
        <CalendarHeader {...state} />
        <CalendarButton {...state} goto="nextMonth" className="next-month">
          <ChevronRight />
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear" className="next-year">
          <DoubleChevronRight />
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr>
            {state.weekDays.map((day, dayIndex) => {
              return (
                <CalendarWeekTitle
                  {...state}
                  as="th"
                  scope="col"
                  key={dayIndex}
                  dayIndex={dayIndex}
                >
                  <abbr title={day.title}>{day.abbr}</abbr>
                </CalendarWeekTitle>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {state.daysInMonth.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <CalendarCell {...state} as="td" key={dayIndex} date={day}>
                  <CalendarCellButton {...state} date={day} />
                </CalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarGrid>
    </CalendarWrapper>
  );
};

export default App;

const DoubleChevronLeft = props => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

const ChevronLeft = props => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );
};

const ChevronRight = props => (
  <ChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);

const DoubleChevronRight = props => (
  <DoubleChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);
```

#### Range Calendar

```js
import React from "react";

import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarCellButton,
  CalendarWeekTitle,
  useRangeCalendarState,
} from "renderless-components";

export const App = props => {
  const state = useRangeCalendarState(props);

  return (
    <Calendar {...state} className="calendar-range">
      <div className="header">
        <CalendarButton {...state} goto="previousYear" className="prev-year">
          <DoubleChevronLeft />
        </CalendarButton>
        <CalendarButton {...state} goto="previousMonth" className="prev-month">
          <ChevronLeft />
        </CalendarButton>
        <CalendarHeader {...state} />
        <CalendarButton {...state} goto="nextMonth" className="next-month">
          <ChevronRight />
        </CalendarButton>
        <CalendarButton {...state} goto="nextYear" className="next-year">
          <DoubleChevronRight />
        </CalendarButton>
      </div>

      <CalendarGrid {...state} as="table" className="dates">
        <thead>
          <tr>
            {state.weekDays.map((day, dayIndex) => {
              return (
                <CalendarWeekTitle
                  {...state}
                  as="th"
                  scope="col"
                  key={dayIndex}
                  dayIndex={dayIndex}
                >
                  <abbr title={day.title}>{day.abbr}</abbr>
                </CalendarWeekTitle>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {state.daysInMonth.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <CalendarCell {...state} as="td" key={dayIndex} date={day}>
                  <CalendarCellButton {...state} date={day} />
                </CalendarCell>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarGrid>
    </Calendar>
  );
};

export default App;

const DoubleChevronLeft = props => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

const ChevronLeft = props => {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );
};

const ChevronRight = props => (
  <ChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);

const DoubleChevronRight = props => (
  <DoubleChevronLeft style={{ transform: "rotate(180deg)" }} {...props} />
);
```