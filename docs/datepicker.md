# DatePicker

`DatePicker` component provides a way to select a date or a range of dates with
the help of [Calendar](./calendar.md) component. It follows the
[Native Input Date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
for the keyboard navigation & accessibility features.

## Table of Contents

- [Usage](#usage)
  - [DatePicker](#datepicker-1)
  - [Range DatePicker](#range-datepicker)
- [Composition](#composition)
- [Props](#props)
  - [`DatePicker`](#datepicker)
  - [`DatePickerContent`](#datepickercontent)
  - [`DatePickerSegment`](#datepickersegment)
  - [`DatePickerSegmentField`](#datepickersegmentfield)
  - [`DatePickerTrigger`](#datepickertrigger)

## Usage

### DatePicker

```js
import * as React from "react";

import {
  DatePicker,
  DatePickerSegment,
  DatePickerContent,
  DatePickerTrigger,
  useDatePickerState,
  DatePickerSegmentField,
  Calendar as CalendarWrapper,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarWeekTitle,
} from "renderless-components";

export const App = props => {
  const state = useDatePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker className="datepicker" {...state}>
        <div className="datepicker__header">
          <DatePickerSegmentField {...state} className="datepicker__field">
            {state.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
              />
            ))}
          </DatePickerSegmentField>

          <DatePickerTrigger className="datepicker__trigger" {...state}>
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <Calendar {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

export default App;

const Calendar = state => {
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

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

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

### Range DatePicker

```js
import React from "react";

import {
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerTrigger,
  DatePickerSegmentField,
  useDateRangePickerState,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarHeader,
  CalendarButton,
  CalendarWeekTitle,
  CalendarCellButton,
} from "renderless-components";

export const App = props => {
  const state = useDateRangePickerState({
    formatOptions: { month: "2-digit", day: "2-digit", year: "numeric" },
    ...props,
  });

  return (
    <>
      <DatePicker aria-label="Date Range" className="datepicker" {...state}>
        <div className="datepicker__header">
          <DatePickerSegmentField
            {...state.startSegmentState}
            className="datepicker__field"
            aria-label="start date"
          >
            {state.startSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
                {...state.startSegmentState}
              />
            ))}
          </DatePickerSegmentField>
          &nbsp;-&nbsp;
          <DatePickerSegmentField
            {...state.endSegmentState}
            className="datepicker__field"
            aria-label="end date"
          >
            {state.endSegmentState.segments.map((segment, i) => (
              <DatePickerSegment
                key={i}
                segment={segment}
                className="datepicker__field--item"
                {...state}
                {...state.endSegmentState}
              />
            ))}
          </DatePickerSegmentField>
          <DatePickerTrigger className="datepicker__trigger" {...state}>
            <CalendarIcon />
          </DatePickerTrigger>
        </div>
      </DatePicker>
      <DatePickerContent {...state}>
        <RangeCalendar {...state.calendar} />
      </DatePickerContent>
    </>
  );
};

export default App;

const RangeCalendar = state => {
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

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

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

[DatePicker - Open On Sandbox](https://codesandbox.io/s/snelw)

[RangeDatePicker - Open On Sandbox](https://codesandbox.io/s/cqgs2)

## Composition

- DatePicker uses [usePickerBase](./picker-base.md)
- DatePickerContent uses [usePickerBaseContent](./picker-base.md)
- DatePickerSegment uses [useSegment](./segment.md)
- DatePickerSegmentField uses [useSegmentField](./segment.md)
- DatePickerTrigger uses [usePickerBaseTrigger](./picker-base.md)

## Props

### `DatePicker`

<details><summary>9 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`pickerId`** <code>string | undefined</code>

- **`dialogId`** <code>string | undefined</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`segmentFocus`** <code>(() =&#62; void) | undefined</code>

- **`show`** <code>() =&#62; void</code> Changes the `visible` state to `true`
- **`isRequired`** <code>boolean | undefined</code>

- **`validationState`** <code>&#34;valid&#34; | &#34;invalid&#34;</code>

</details>

### `DatePickerContent`

<details><summary>7 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`pickerId`** <code>string | undefined</code>

- **`dialogId`** <code>string | undefined</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`segmentFocus`** <code>(() =&#62; void) | undefined</code>

- **`show`** <code>() =&#62; void</code> Changes the `visible` state to `true`

</details>

### `DatePickerSegment`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
- **`segment`** <code>DateSegment</code>

<details><summary>28 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code> If enabled, the composite element will act as an
  [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
  container instead of
  [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
  DOM focus will remain on the composite while its items receive virtual focus.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`registerItem`** <code>(item: Item) =&#62; void</code> Registers a composite
  item.
- **`unregisterItem`** <code>(id: string) =&#62; void</code> Unregisters a
  composite item.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`next`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the next item.
- **`previous`** <code>(unstable_allTheWay?: boolean | undefined) =&#62;
  void</code> Moves focus to the previous item.
- **`up`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item above.
- **`down`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item below.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`fieldValue`** <code>Date</code>

- **`setSegment`** <code>(part: DateTimeFormatPartTypes, v: number) =&#62;
  void</code>

- **`increment`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`decrement`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`incrementPage`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`decrementPage`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`dateFormatter`** <code>DateTimeFormat</code>

- **`confirmPlaceholder`** <code>(part: DateTimeFormatPartTypes) =&#62;
  void</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`isRequired`** <code>boolean | undefined</code>

- **`pickerId`** <code>string | undefined</code>

- **`isDateRangePicker`** <code>boolean</code>

</details>

### `DatePickerSegmentField`

<details><summary>1 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.

</details>

### `DatePickerTrigger`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>6 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`toggle`** <code>() =&#62; void</code> Toggles the `visible` state
- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code> The reference element.
- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

</details>
