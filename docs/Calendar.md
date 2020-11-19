## Calendar

Accessible `Calendar` component.

# Props

<!-- Automatically generated -->

### `Calendar`

<details><summary>1 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`calendarId`** <code>string | undefined</code>

</details>

### `CalendarButton`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`goto`**
  <code title="&#34;nextMonth&#34; | &#34;previousMonth&#34; | &#34;nextYear&#34; | &#34;previousYear&#34;">&#34;nextMonth&#34;
  | &#34;previousMonth&#34; | &#34;nextYear&#34; | &#34;p...</code>

<details><summary>4 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`focusNextMonth`** <code>() =&#62; void</code>

- **`focusPreviousMonth`** <code>() =&#62; void</code>

- **`focusPreviousYear`** <code>() =&#62; void</code>

- **`focusNextYear`** <code>() =&#62; void</code>

</details>

### `CalendarCell`

- **`date`** <code>Date</code>

<details><summary>6 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`isDisabled`** <code>boolean</code>

- **`dateValue`** <code>Date</code>

- **`currentMonth`** <code>Date</code>

- **`isRangeCalendar`** <code>boolean</code>

- **`highlightDate`** <code>(date: Date) =&#62; void</code>

- **`highlightedRange`** <code>RangeValue&#60;Date&#62; | null</code>

</details>

### `CalendarCellButton`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`date`** <code>Date</code>

<details><summary>11 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`isDisabled`** <code>boolean</code>

- **`dateValue`** <code>Date</code>

- **`isRangeCalendar`** <code>boolean</code>

- **`focusedDate`** <code>Date</code>

- **`selectDate`** <code>(date: Date) =&#62; void</code>

- **`setFocusedDate`** <code>(value: SetStateAction&#60;Date&#62;) =&#62;
  void</code>

- **`month`** <code>number</code>

- **`minDate`** <code>Date | undefined</code>

- **`maxDate`** <code>Date | undefined</code>

- **`isFocused`** <code>boolean</code>

- **`anchorDate`** <code>Date | null</code>

</details>

### `CalendarGrid`

<details><summary>17 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`isDisabled`** <code>boolean</code>

- **`isReadOnly`** <code>boolean</code>

- **`calendarId`** <code>string | undefined</code>

- **`focusNextMonth`** <code>() =&#62; void</code>

- **`focusPreviousMonth`** <code>() =&#62; void</code>

- **`focusPreviousYear`** <code>() =&#62; void</code>

- **`focusNextYear`** <code>() =&#62; void</code>

- **`isRangeCalendar`** <code>boolean</code>

- **`setFocused`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code>

- **`selectFocusedDate`** <code>() =&#62; void</code>

- **`focusEndOfMonth`** <code>() =&#62; void</code>

- **`focusStartOfMonth`** <code>() =&#62; void</code>

- **`focusNextDay`** <code>() =&#62; void</code>

- **`focusPreviousDay`** <code>() =&#62; void</code>

- **`focusNextWeek`** <code>() =&#62; void</code>

- **`focusPreviousWeek`** <code>() =&#62; void</code>

- **`setAnchorDate`** <code>(value: SetStateAction&#60;Date | null&#62;) =&#62;
  void</code>

</details>

### `CalendarHeader`

- **`format`** <code>DateTimeFormatOpts | undefined</code>

<details><summary>2 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`calendarId`** <code>string | undefined</code>

- **`currentMonth`** <code>Date</code>

</details>

### `CalendarWeekTitle`

- **`dayIndex`** <code>number</code>

<details><summary>1 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`weekDays`** <code>{ title: string; abbr: string; }[]</code>

</details>

### Example

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
