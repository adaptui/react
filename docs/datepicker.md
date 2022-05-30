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
  - [`useDatePickerState`](#usedatepickerstate)
  - [`useDateRangePickerState`](#usedaterangepickerstate)
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
  Calendar as CalendarWrapper,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarWeekTitle,
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerSegmentField,
  DatePickerTrigger,
  useDatePickerState,
} from "@adaptui/react";

import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "./Utils.component";

export const Datepicker = props => {
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

export default Datepicker;

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
```

[![Edit CodeSandbox](https://img.shields.io/badge/DatePicker-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/kzk3i)

### Range DatePicker

```js
import React from "react";

import {
  Calendar,
  CalendarButton,
  CalendarCell,
  CalendarCellButton,
  CalendarGrid,
  CalendarHeader,
  CalendarWeekTitle,
  DatePicker,
  DatePickerContent,
  DatePickerSegment,
  DatePickerSegmentField,
  DatePickerTrigger,
  useDateRangePickerState,
} from "@adaptui/react";

import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "./Utils.component";

export const DateRangePicker = props => {
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

export default DatePicker;

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
```

[![Edit CodeSandbox](https://img.shields.io/badge/RangeDatePicker-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/181vj)

## Composition

- DatePicker uses [usePickerBase](./picker-base.md)
- DatePickerContent uses [usePickerBaseContent](./picker-base.md)
- DatePickerSegment uses [useSegment](./segment.md)
- DatePickerSegmentField uses [useSegmentField](./segment.md)
- DatePickerTrigger uses [usePickerBaseTrigger](./picker-base.md)

## Props

### `useDatePickerState`

| Name                                                                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**                                                         | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The current value (controlled).                                                                                                                                                                                                                                       |
| **`defaultValue`**                                                  | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The default value (uncontrolled).                                                                                                                                                                                                                                     |
| **`onChange`**                                                      | <code>((value: T) =&#62; void) \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                        | Handler that is called when the value changes.                                                                                                                                                                                                                        |
| **`minValue`**                                                      | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The smallest value allowed.                                                                                                                                                                                                                                           |
| **`maxValue`**                                                      | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The largest value allowed.                                                                                                                                                                                                                                            |
| **`validationState`**                                               | <code>ValidationState \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                                                                                                                             |
| **`isRequired`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input.                                                                                                            |
| **`baseId`**                                                        | <code>string</code>                                                                                                                                                                                                                                                                                                                                                                                                                       | ID that will serve as a base for all the items IDs.                                                                                                                                                                                                                   |
| **`visible`**                                                       | <code>boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                                      | Whether it's visible or not.                                                                                                                                                                                                                                          |
| **`animated`**                                                      | <code>number \| boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                            | If `true`, `animating` will be set to `true` when `visible` is updated.It'll wait for `stopAnimation` to be called or a CSS transition ends.If `animated` is set to a `number`, `stopAnimation` will be called onlyafter the same number of milliseconds have passed. |
| **`modal`**                                                         | <code>boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                                      | Toggles Dialog's `modal` state. - Non-modal: `preventBodyScroll` doesn't work and focus is free. - Modal: `preventBodyScroll` is automatically enabled, focus istrapped within the dialog and the dialog is rendered within a `Portal`by default.                     |
| **`placement`**                                                     | <code title="&#34;auto-start&#34; \| &#34;auto&#34; \| &#34;auto-end&#34; \| &#34;top-start&#34; \| &#34;top&#34; \| &#34;top-end&#34; \| &#34;right-start&#34; \| &#34;right&#34; \| &#34;right-end&#34; \| &#34;bottom-end&#34; \| &#34;bottom&#34; \| &#34;bottom-start&#34; \| &#34;left-end&#34; \| &#34;left&#34; \| &#34;left-start&#34;">&#34;auto-start&#34; \| &#34;auto&#34; \| &#34;auto-end&#34; \| &#34;top-start...</code> | Actual `placement`.                                                                                                                                                                                                                                                   |
| **`unstable_fixed`** <span title="Experimental">⚠️</span>           | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether or not the popover should have `position` set to `fixed`.                                                                                                                                                                                                     |
| **`unstable_flip`** <span title="Experimental">⚠️</span>            | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Flip the popover's placement when it starts to overlap its referenceelement.                                                                                                                                                                                          |
| **`unstable_offset`** <span title="Experimental">⚠️</span>          | <code>[string \| number, string \| number] \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                            | Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.                                                                                                                                                            |
| **`gutter`**                                                        | <code>number \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.                                                                                                                                                         |
| **`unstable_preventOverflow`** <span title="Experimental">⚠️</span> | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Prevents popover from being positioned outside the boundary.                                                                                                                                                                                                          |
| **`isDisabled`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the input is disabled.                                                                                                                                                                                                                                        |
| **`isReadOnly`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                                                                                                                                        |
| **`pickerId`**                                                      | <code>string \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Picker wrapper Id                                                                                                                                                                                                                                                     |
| **`dialogId`**                                                      | <code>string \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Dialog Id                                                                                                                                                                                                                                                             |
| **`segmentFocus`**                                                  | <code>(() =&#62; void) \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                | Function to be called on picker mousedownfor focusing first tabbable element                                                                                                                                                                                          |
| **`formatOptions`**                                                 | <code>DateTimeFormatOptions \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                           | Sets formmating of date based on Intl.DateFormatOptionshttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat                                                                                                           |
| **`placeholderDate`**                                               | <code>Date \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                            | Placeholder date                                                                                                                                                                                                                                                      |
| **`autoFocus`**                                                     | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the element should receive focus on render.                                                                                                                                                                                                                   |

### `useDateRangePickerState`

| Name                                                                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**                                                         | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The current value (controlled).                                                                                                                                                                                                                                       |
| **`defaultValue`**                                                  | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The default value (uncontrolled).                                                                                                                                                                                                                                     |
| **`onChange`**                                                      | <code>((value: T) =&#62; void) \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                        | Handler that is called when the value changes.                                                                                                                                                                                                                        |
| **`minValue`**                                                      | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The smallest value allowed.                                                                                                                                                                                                                                           |
| **`maxValue`**                                                      | <code>T \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                               | The largest value allowed.                                                                                                                                                                                                                                            |
| **`validationState`**                                               | <code>ValidationState \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                                                                                                                             |
| **`isRequired`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input.                                                                                                            |
| **`baseId`**                                                        | <code>string</code>                                                                                                                                                                                                                                                                                                                                                                                                                       | ID that will serve as a base for all the items IDs.                                                                                                                                                                                                                   |
| **`visible`**                                                       | <code>boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                                      | Whether it's visible or not.                                                                                                                                                                                                                                          |
| **`animated`**                                                      | <code>number \| boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                            | If `true`, `animating` will be set to `true` when `visible` is updated.It'll wait for `stopAnimation` to be called or a CSS transition ends.If `animated` is set to a `number`, `stopAnimation` will be called onlyafter the same number of milliseconds have passed. |
| **`modal`**                                                         | <code>boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                                      | Toggles Dialog's `modal` state. - Non-modal: `preventBodyScroll` doesn't work and focus is free. - Modal: `preventBodyScroll` is automatically enabled, focus istrapped within the dialog and the dialog is rendered within a `Portal`by default.                     |
| **`placement`**                                                     | <code title="&#34;auto-start&#34; \| &#34;auto&#34; \| &#34;auto-end&#34; \| &#34;top-start&#34; \| &#34;top&#34; \| &#34;top-end&#34; \| &#34;right-start&#34; \| &#34;right&#34; \| &#34;right-end&#34; \| &#34;bottom-end&#34; \| &#34;bottom&#34; \| &#34;bottom-start&#34; \| &#34;left-end&#34; \| &#34;left&#34; \| &#34;left-start&#34;">&#34;auto-start&#34; \| &#34;auto&#34; \| &#34;auto-end&#34; \| &#34;top-start...</code> | Actual `placement`.                                                                                                                                                                                                                                                   |
| **`unstable_fixed`** <span title="Experimental">⚠️</span>           | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether or not the popover should have `position` set to `fixed`.                                                                                                                                                                                                     |
| **`unstable_flip`** <span title="Experimental">⚠️</span>            | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Flip the popover's placement when it starts to overlap its referenceelement.                                                                                                                                                                                          |
| **`unstable_offset`** <span title="Experimental">⚠️</span>          | <code>[string \| number, string \| number] \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                            | Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.                                                                                                                                                            |
| **`gutter`**                                                        | <code>number \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.                                                                                                                                                         |
| **`unstable_preventOverflow`** <span title="Experimental">⚠️</span> | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Prevents popover from being positioned outside the boundary.                                                                                                                                                                                                          |
| **`isDisabled`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the input is disabled.                                                                                                                                                                                                                                        |
| **`isReadOnly`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                                                                                                                                        |
| **`pickerId`**                                                      | <code>string \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Picker wrapper Id                                                                                                                                                                                                                                                     |
| **`dialogId`**                                                      | <code>string \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Dialog Id                                                                                                                                                                                                                                                             |
| **`segmentFocus`**                                                  | <code>(() =&#62; void) \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                | Function to be called on picker mousedownfor focusing first tabbable element                                                                                                                                                                                          |
| **`formatOptions`**                                                 | <code>DateTimeFormatOptions \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                           | Sets formmating of date based on Intl.DateFormatOptionshttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat                                                                                                           |
| **`placeholderDate`**                                               | <code>Date \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                            | Placeholder date                                                                                                                                                                                                                                                      |
| **`autoFocus`**                                                     | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the element should receive focus on render.                                                                                                                                                                                                                   |

### `DatePicker`

<details><summary>9 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                  | Type                                              | Description                           |
| :-------------------- | :------------------------------------------------ | :------------------------------------ |
| **`visible`**         | <code>boolean</code>                              | Whether it's visible or not.          |
| **`pickerId`**        | <code>string \| undefined</code>                  |                                       |
| **`dialogId`**        | <code>string \| undefined</code>                  |                                       |
| **`isDisabled`**      | <code>boolean \| undefined</code>                 |                                       |
| **`isReadOnly`**      | <code>boolean \| undefined</code>                 |                                       |
| **`segmentFocus`**    | <code>(() =&#62; void) \| undefined</code>        |                                       |
| **`show`**            | <code>() =&#62; void</code>                       | Changes the `visible` state to `true` |
| **`isRequired`**      | <code>boolean \| undefined</code>                 |                                       |
| **`validationState`** | <code>&#34;valid&#34; \| &#34;invalid&#34;</code> |                                       |

</details>

### `DatePickerContent`

<details><summary>7 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name               | Type                                       | Description                           |
| :----------------- | :----------------------------------------- | :------------------------------------ |
| **`visible`**      | <code>boolean</code>                       | Whether it's visible or not.          |
| **`pickerId`**     | <code>string \| undefined</code>           |                                       |
| **`dialogId`**     | <code>string \| undefined</code>           |                                       |
| **`isDisabled`**   | <code>boolean \| undefined</code>          |                                       |
| **`isReadOnly`**   | <code>boolean \| undefined</code>          |                                       |
| **`segmentFocus`** | <code>(() =&#62; void) \| undefined</code> |                                       |
| **`show`**         | <code>() =&#62; void</code>                | Changes the `visible` state to `true` |

</details>

### `DatePickerSegment`

| Name            | Type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |
| **`id`**        | <code>string \| undefined</code>  | Same as the HTML attribute.                                                                                                                                  |
| **`segment`**   | <code>DateSegment</code>          |                                                                                                                                                              |

<details><summary>28 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                                                        | Type                                                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`baseId`**                                                | <code>string</code>                                                                                                                                    | ID that will serve as a base for all the items IDs.                                                                                                                                                                                                                                                                                                                                            |
| **`unstable_virtual`** <span title="Experimental">⚠️</span> | <code>boolean</code>                                                                                                                                   | If enabled, the composite element will act as an[aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)container instead of[roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).DOM focus will remain on the composite while its items receive virtual focus.                                                            |
| **`orientation`**                                           | <code>Orientation \| undefined</code>                                                                                                                  | Defines the orientation of the composite widget. If the composite has asingle row or column (one-dimensional), the `orientation` value determineswhich arrow keys can be used to move focus: - `undefined`: all arrow keys work. - `horizontal`: only left and right arrow keys work. - `vertical`: only up and down arrow keys work.It doesn't have any effect on two-dimensional composites. |
| **`unstable_moves`** <span title="Experimental">⚠️</span>   | <code>number</code>                                                                                                                                    | Stores the number of moves that have been performed by calling `move`,`next`, `previous`, `up`, `down`, `first` or `last`.                                                                                                                                                                                                                                                                     |
| **`currentId`**                                             | <code>string \| null \| undefined</code>                                                                                                               | The current focused item `id`. - `undefined` will automatically focus the first enabled composite item. - `null` will focus the base composite element and users will be able tonavigate out of it using arrow keys. - If `currentId` is initially set to `null`, the base composite elementitself will have focus and users will be able to navigate to it usingarrow keys.                   |
| **`items`**                                                 | <code>Item[]</code>                                                                                                                                    | Lists all the composite items with their `id`, DOM `ref`, `disabled` stateand `groupId` if any. This state is automatically updated when`registerItem` and `unregisterItem` are called.                                                                                                                                                                                                        |
| **`registerItem`**                                          | <code>(item: Item) =&#62; void</code>                                                                                                                  | Registers a composite item.                                                                                                                                                                                                                                                                                                                                                                    |
| **`unregisterItem`**                                        | <code>(id: string) =&#62; void</code>                                                                                                                  | Unregisters a composite item.                                                                                                                                                                                                                                                                                                                                                                  |
| **`setCurrentId`**                                          | <code title="(value: SetStateAction&#60;string \| null \| undefined&#62;) =&#62; void">(value: SetStateAction&#60;string \| null \| undefine...</code> | Sets `currentId`. This is different from `composite.move` as this onlyupdates the `currentId` state without moving focus. When the compositewidget gets focused by the user, the item referred by the `currentId`state will get focus.                                                                                                                                                         |
| **`next`**                                                  | <code>(unstable_allTheWay?: boolean \| undefined) =&#62; void</code>                                                                                   | Moves focus to the next item.                                                                                                                                                                                                                                                                                                                                                                  |
| **`previous`**                                              | <code>(unstable_allTheWay?: boolean \| undefined) =&#62; void</code>                                                                                   | Moves focus to the previous item.                                                                                                                                                                                                                                                                                                                                                              |
| **`up`**                                                    | <code>(unstable_allTheWay?: boolean \| undefined) =&#62; void</code>                                                                                   | Moves focus to the item above.                                                                                                                                                                                                                                                                                                                                                                 |
| **`down`**                                                  | <code>(unstable_allTheWay?: boolean \| undefined) =&#62; void</code>                                                                                   | Moves focus to the item below.                                                                                                                                                                                                                                                                                                                                                                 |
| **`first`**                                                 | <code>() =&#62; void</code>                                                                                                                            | Moves focus to the first item.                                                                                                                                                                                                                                                                                                                                                                 |
| **`last`**                                                  | <code>() =&#62; void</code>                                                                                                                            | Moves focus to the last item.                                                                                                                                                                                                                                                                                                                                                                  |
| **`fieldValue`**                                            | <code>Date</code>                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`setSegment`**                                            | <code>(part: DateTimeFormatPartTypes, v: number) =&#62; void</code>                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`increment`**                                             | <code>(part: DateTimeFormatPartTypes) =&#62; void</code>                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`decrement`**                                             | <code>(part: DateTimeFormatPartTypes) =&#62; void</code>                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`incrementPage`**                                         | <code>(part: DateTimeFormatPartTypes) =&#62; void</code>                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`decrementPage`**                                         | <code>(part: DateTimeFormatPartTypes) =&#62; void</code>                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`dateFormatter`**                                         | <code>DateTimeFormat</code>                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`confirmPlaceholder`**                                    | <code>(part: DateTimeFormatPartTypes) =&#62; void</code>                                                                                               |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`isDisabled`**                                            | <code>boolean \| undefined</code>                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`isReadOnly`**                                            | <code>boolean \| undefined</code>                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`isRequired`**                                            | <code>boolean \| undefined</code>                                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`pickerId`**                                              | <code>string \| undefined</code>                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`isDateRangePicker`**                                     | <code>boolean</code>                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                |

</details>

### `DatePickerSegmentField`

<details><summary>1 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name         | Type                | Description                                         |
| :----------- | :------------------ | :-------------------------------------------------- |
| **`baseId`** | <code>string</code> | ID that will serve as a base for all the items IDs. |

</details>

### `DatePickerTrigger`

| Name            | Type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |

<details><summary>6 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                                                             | Type                                                | Description                                         |
| :--------------------------------------------------------------- | :-------------------------------------------------- | :-------------------------------------------------- |
| **`visible`**                                                    | <code>boolean</code>                                | Whether it's visible or not.                        |
| **`baseId`**                                                     | <code>string</code>                                 | ID that will serve as a base for all the items IDs. |
| **`toggle`**                                                     | <code>() =&#62; void</code>                         | Toggles the `visible` state                         |
| **`unstable_referenceRef`** <span title="Experimental">⚠️</span> | <code>RefObject&#60;HTMLElement \| null&#62;</code> | The reference element.                              |
| **`isDisabled`**                                                 | <code>boolean \| undefined</code>                   |                                                     |
| **`isReadOnly`**                                                 | <code>boolean \| undefined</code>                   |                                                     |

</details>
