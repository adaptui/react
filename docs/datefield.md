# DateField

`DateField` component provides a way to select a date with the help of
[Calendar](./calendar.md) component. It follows the
[Native Input Date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
for the keyboard navigation & accessibility features. Supports all the features
of React Aria's
[useDateField](https://react-spectrum.adobe.com/react-aria/useDateField.html#features)

## Table of Contents

- [Usage](#usage)
  - [DateField](#datefield-1)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`DateSegmentOptions`](#datesegmentoptions)
  - [`DateFieldOptions`](#datefieldoptions)
  - [`DateFieldBaseStateProps`](#datefieldbasestateprops)
  - [`DateFieldStateProps`](#datefieldstateprops)

## Usage

### DateField

```js
import React from "react";
import { createCalendar } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import {
  DateField,
  DateSegment,
  useDateFieldBaseState,
  useDateFieldState,
} from "@adaptui/react";

export const DateFieldBasic = props => {
  let { locale } = useLocale();

  const state = useDateFieldBaseState({ locale, createCalendar, ...props });
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

[![Edit CodeSandbox](https://img.shields.io/badge/DateField-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/0sjx62)
[![Edit CodeSandbox](https://img.shields.io/badge/DateField%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/9nxrgq)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/DateField%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/euhlex)
[![Edit CodeSandbox](https://img.shields.io/badge/DateField%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ueff3z)

## Composition

- DateSegment uses `Role`
- DateField uses `Role`
- DateFieldBaseState uses its own state
- DateFieldState uses its own state

## Props

### `DateSegmentOptions`

| Name          | Type                        | Description                                          |
| :------------ | :-------------------------- | :--------------------------------------------------- |
| **`segment`** | <code>DateSegment</code>    |                                                      |
| **`state`**   | <code>DateFieldState</code> | Object returned by the `useDateFieldBaseState` hook. |

### `DateFieldOptions`

| Name        | Type                        | Description                                          |
| :---------- | :-------------------------- | :--------------------------------------------------- |
| **`state`** | <code>DateFieldState</code> | Object returned by the `useDateFieldBaseState` hook. |

### `DateFieldBaseStateProps`

| Name                    | Type                                                                                                                                                      | Description                                                                                                                                                                                                                                                           |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`minValue`**          | <code>DateValue \| undefined</code>                                                                                                                       | The minimum allowed date that a user may select.                                                                                                                                                                                                                      |
| **`maxValue`**          | <code>DateValue \| undefined</code>                                                                                                                       | The maximum allowed date that a user may select.                                                                                                                                                                                                                      |
| **`isDateUnavailable`** | <code>((date: DateValue) =&#62; boolean) \| undefined</code>                                                                                              | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                                                                                                                                              |
| **`placeholderValue`**  | <code>T \| undefined</code>                                                                                                                               | A placeholder date that influences the format of the placeholder shown when no value is selected. Defaults to today's date at midnight.                                                                                                                               |
| **`hourCycle`**         | <code>12 \| 24 \| undefined</code>                                                                                                                        | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.                                                                                                                                                             |
| **`granularity`**       | <code>Granularity \| undefined</code>                                                                                                                     | Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times.                                                                                                                                   |
| **`hideTimeZone`**      | <code>boolean \| undefined</code>                                                                                                                         | Whether to hide the time zone abbreviation.                                                                                                                                                                                                                           |
| **`isDisabled`**        | <code>boolean \| undefined</code>                                                                                                                         | Whether the input is disabled.                                                                                                                                                                                                                                        |
| **`isReadOnly`**        | <code>boolean \| undefined</code>                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                                                                                                                                        |
| **`validationState`**   | <code>ValidationState \| undefined</code>                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                                                                                                                             |
| **`isRequired`**        | <code>boolean \| undefined</code>                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input.                                                                                                            |
| **`autoFocus`**         | <code>boolean \| undefined</code>                                                                                                                         | Whether the element should receive focus on render.                                                                                                                                                                                                                   |
| **`onFocus`**           | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element receives focus.                                                                                                                                                                                                               |
| **`onBlur`**            | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element loses focus.                                                                                                                                                                                                                  |
| **`onFocusChange`**     | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                              | Handler that is called when the element's focus status changes.                                                                                                                                                                                                       |
| **`onKeyDown`**         | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is pressed.                                                                                                                                                                                                                         |
| **`onKeyUp`**           | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is released.                                                                                                                                                                                                                        |
| **`label`**             | <code>ReactNode</code>                                                                                                                                    | The content to display as the label.                                                                                                                                                                                                                                  |
| **`description`**       | <code>ReactNode</code>                                                                                                                                    | A description for the field. Provides a hint such as specific requirements for what to choose.                                                                                                                                                                        |
| **`errorMessage`**      | <code>ReactNode</code>                                                                                                                                    | An error message for the field.                                                                                                                                                                                                                                       |
| **`isOpen`**            | <code>boolean \| undefined</code>                                                                                                                         | Whether the overlay is open by default (controlled).                                                                                                                                                                                                                  |
| **`defaultOpen`**       | <code>boolean \| undefined</code>                                                                                                                         | Whether the overlay is open by default (uncontrolled).                                                                                                                                                                                                                |
| **`onOpenChange`**      | <code>((isOpen: boolean) =&#62; void) \| undefined</code>                                                                                                 | Handler that is called when the overlay's open state changes.                                                                                                                                                                                                         |
| **`value`**             | <code>T \| undefined</code>                                                                                                                               | The current value (controlled).                                                                                                                                                                                                                                       |
| **`defaultValue`**      | <code>T \| undefined</code>                                                                                                                               | The default value (uncontrolled).                                                                                                                                                                                                                                     |
| **`onChange`**          | <code>((value: C) =&#62; void) \| undefined</code>                                                                                                        | Handler that is called when the value changes.                                                                                                                                                                                                                        |
| **`maxGranularity`**    | <code>Granularity \| &#34;year&#34; \| &#34;month&#34; \| undefined</code>                                                                                | The maximum unit to display in the date field.                                                                                                                                                                                                                        |
| **`locale`**            | <code>string</code>                                                                                                                                       | The locale to display and edit the value according to.                                                                                                                                                                                                                |
| **`createCalendar`**    | <code>(name: string) =&#62; Calendar</code>                                                                                                               | A function that creates a [Calendar](../internationalized/date/Calendar.html)object for a given calendar identifier. Such a function may be imported from the`@internationalized/date` package, or manually implemented to include support foronly certain calendars. |

### `DateFieldStateProps`

| Name                    | Type                                                                                                                                                      | Description                                                                                                                                                |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`isDateUnavailable`** | <code>((date: DateValue) =&#62; boolean) \| undefined</code>                                                                                              | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                                   |
| **`hourCycle`**         | <code>12 \| 24 \| undefined</code>                                                                                                                        | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.                                                  |
| **`granularity`**       | <code>Granularity \| undefined</code>                                                                                                                     | Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times.                        |
| **`hideTimeZone`**      | <code>boolean \| undefined</code>                                                                                                                         | Whether to hide the time zone abbreviation.                                                                                                                |
| **`isDisabled`**        | <code>boolean \| undefined</code>                                                                                                                         | Whether the input is disabled.                                                                                                                             |
| **`isReadOnly`**        | <code>boolean \| undefined</code>                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                             |
| **`validationState`**   | <code>ValidationState \| undefined</code>                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                  |
| **`isRequired`**        | <code>boolean \| undefined</code>                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input. |
| **`autoFocus`**         | <code>boolean \| undefined</code>                                                                                                                         | Whether the element should receive focus on render.                                                                                                        |
| **`onFocus`**           | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element receives focus.                                                                                                    |
| **`onBlur`**            | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element loses focus.                                                                                                       |
| **`onFocusChange`**     | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                              | Handler that is called when the element's focus status changes.                                                                                            |
| **`onKeyDown`**         | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is pressed.                                                                                                              |
| **`onKeyUp`**           | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is released.                                                                                                             |
| **`label`**             | <code>ReactNode</code>                                                                                                                                    | The content to display as the label.                                                                                                                       |
| **`description`**       | <code>ReactNode</code>                                                                                                                                    | A description for the field. Provides a hint such as specific requirements for what to choose.                                                             |
| **`errorMessage`**      | <code>ReactNode</code>                                                                                                                                    | An error message for the field.                                                                                                                            |
| **`isOpen`**            | <code>boolean \| undefined</code>                                                                                                                         | Whether the overlay is open by default (controlled).                                                                                                       |
| **`defaultOpen`**       | <code>boolean \| undefined</code>                                                                                                                         | Whether the overlay is open by default (uncontrolled).                                                                                                     |
| **`onOpenChange`**      | <code>((isOpen: boolean) =&#62; void) \| undefined</code>                                                                                                 | Handler that is called when the overlay's open state changes.                                                                                              |
| **`aria-label`**        | <code>string \| undefined</code>                                                                                                                          | Defines a string value that labels the current element.                                                                                                    |
| **`aria-labelledby`**   | <code>string \| undefined</code>                                                                                                                          | Identifies the element (or elements) that labels the current element.                                                                                      |
| **`aria-describedby`**  | <code>string \| undefined</code>                                                                                                                          | Identifies the element (or elements) that describes the object.                                                                                            |
| **`aria-details`**      | <code>string \| undefined</code>                                                                                                                          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                         |
| **`id`**                | <code>string \| undefined</code>                                                                                                                          | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                        |
| **`state`**             | <code>DateFieldState</code>                                                                                                                               | Object returned by the `useDateFieldBaseState` hook.                                                                                                       |
