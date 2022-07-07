# DatePicker

`DatePicker` component provides a way to select a date or a range of dates with
the help of [Calendar](./calendar.md) component. It follows the
[Native Input Date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
for the keyboard navigation & accessibility features.

## Table of Contents

- [Usage](#usage)
  - [DatePicker](#datepicker-1)
  - [Range DatePicker](#range-datepicker)

## Usage

### DatePicker

```js
import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import CalendarBasic from "../../calendar/stories/CalendarBasic.component";
import DateFieldBasic from "../../datefield/stories/DateFieldBasic.component";
import {
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerPopover,
  useDatePickerBaseState,
  useDatePickerState,
} from "@adaptui/react";

import { CalendarIcon } from "./Utils.component";

export const DatePickerBasic = props => {
  const { locale } = useLocale();
  const state = useDatePickerBaseState({ ...props, gutter: 10 });
  const datepicker = useDatePickerState({ ...props, state });

  return (
    <div style={{ position: "relative" }} className="datepicker">
      <DatePickerGroup
        state={datepicker}
        className="datepicker__header"
        aria-label="DatePicker"
      >
        <DateFieldBasic
          {...datepicker.fieldProps}
          createCalendar={createCalendar}
          locale={locale}
        />
        <DatePickerDisclosure
          state={datepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={datepicker} className="popover">
            <CalendarBasic
              {...datepicker.calendarProps}
              locale={locale}
              createCalendar={createCalendar}
            />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DatePickerBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/DatePicker-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/yq9xlm)

### Range DatePicker

```js
import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import CalendarRange from "../../calendar/stories/CalendarRange.component";
import DateFieldBasic from "../../datefield/stories/DateFieldBasic.component";
import {
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerPopover,
  useDateRangePickerBaseState,
  useDateRangePickerState,
} from "@adaptui/react";

import DatePickerBasic from "./DatePickerBasic.component";
import { CalendarIcon } from "./Utils.component";

export const DateRangePickerBasic = props => {
  const { locale } = useLocale();
  const state = useDateRangePickerBaseState({ ...props, gutter: 10 });
  const daterangepicker = useDateRangePickerState({ ...props, state });

  return (
    <div style={{ position: "relative" }} className="datepicker">
      <DatePickerGroup
        state={daterangepicker}
        className="datepicker__header"
        aria-label="DatePicker"
      >
        <DateFieldBasic
          {...daterangepicker.startFieldProps}
          createCalendar={createCalendar}
          locale={locale}
        />
        <div aria-hidden="true" className="datepicker__dash" />
        <DateFieldBasic
          {...daterangepicker.endFieldProps}
          createCalendar={createCalendar}
          locale={locale}
        />
        <DatePickerDisclosure
          state={daterangepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
        {state.popover.visible && (
          <DatePickerPopover state={daterangepicker} className="popover">
            <CalendarRange
              {...daterangepicker.calendarProps}
              locale={locale}
              createCalendar={createCalendar}
            />
          </DatePickerPopover>
        )}
      </DatePickerGroup>
    </div>
  );
};

export default DatePickerBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/RangeDatePicker-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/nzie5u)

## Composition

- DatePickerDisclosure uses
- DatePickerGroup uses
- DatePickerLabel uses
- DatePickerPopover uses

<!-- INJECT_PROPS src/datepicker -->
