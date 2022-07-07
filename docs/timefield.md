# TimeField

`TimeField` component provides a way to select a time while giving the freedom
to style. It follows the
[Native Input Time](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)
for the keyboard navigation & accessibility features.

## Table of Contents

- [Usage](#usage)

## Usage

```js
import React from "react";
import { VisuallyHidden } from "ariakit";

import {
  TimeField,
  TimeFieldLabel,
  TimeSegment,
  useTimeFieldBaseState,
  useTimeFieldState,
} from "@adaptui/react";

export const TimeFieldBasic = props => {
  const state = useTimeFieldBaseState({ ...props });
  const timefield = useTimeFieldState({ ...props, state });
  console.log("%ctimefield", "color: #733d00", timefield);

  return (
    <>
      <VisuallyHidden as={TimeFieldLabel} state={timefield}>
        {props.label}
      </VisuallyHidden>
      <TimeField state={timefield} className="datepicker__field">
        {state.segments.map((segment, i) => (
          <TimeSegment
            key={i}
            segment={segment}
            state={state}
            className="datepicker__field--item"
          >
            {segment.text}
          </TimeSegment>
        ))}
      </TimeField>
    </>
  );
};

export default TimeFieldBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/TimeField-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ogx8li)

## Composition

- TimeSegment uses
- TimeField uses
- TimeFieldLabel uses

<!-- INJECT_PROPS src/timefield -->
