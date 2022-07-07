# DateField

`DateField` component provides a way to select a date with the help of
[Calendar](./calendar.md) component. It follows the
[Native Input Date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
for the keyboard navigation & accessibility features.

## Table of Contents

- [Usage](#usage)
  - [DateField](#datefield-1)

## Usage

### DateField

```js
import React from "react";

import {
  DateField,
  DateSegment,
  useDateFieldBaseState,
  useDateFieldState,
} from "@adaptui/react";

export const DateFieldBasic = props => {
  const state = useDateFieldBaseState({ ...props });
  const datefield = useDateFieldState({ ...props, state });

  return (
    <DateField state={datefield} className="datepicker__field">
      {state.segments.map((segment, i) => (
        <DateSegment
          key={i}
          segment={segment}
          state={state}
          className="datepicker__field--item"
        >
          {segment.text}
        </DateSegment>
      ))}
    </DateField>
  );
};

export default DateFieldBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/DateField-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/mvnst9)
