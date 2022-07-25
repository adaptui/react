# TimeField

`TimeField` component provides a way to select a time while giving the freedom
to style. It follows the
[Native Input Time](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)
for the keyboard navigation & accessibility features. Supports all the features
of React Aria's
[useTimeField](https://react-spectrum.adobe.com/react-aria/useTimeField.html#features).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`TimeSegmentOptions`](#timesegmentoptions)
  - [`TimeFieldOptions`](#timefieldoptions)
  - [`TimeFieldBaseStateProps`](#timefieldbasestateprops)
  - [`TimeFieldDescriptionOptions`](#timefielddescriptionoptions)
  - [`TimeFieldErrorMessageOptions`](#timefielderrormessageoptions)
  - [`TimeFieldLabelOptions`](#timefieldlabeloptions)
  - [`TimeFieldStateProps`](#timefieldstateprops)

## Usage

```js
import React from "react";
import { useLocale } from "@react-aria/i18n";

import {
  TimeField,
  TimeFieldLabel,
  TimeSegment,
  useTimeFieldBaseState,
  useTimeFieldState,
} from "@adaptui/react";

export const TimeFieldBasic = props => {
  let { locale } = useLocale();

  const state = useTimeFieldBaseState({ locale, ...props });
  const datefield = useTimeFieldState({ ...props, state });

  return (
    <div className="timefield">
      <TimeFieldLabel state={datefield} className="timefield__label">
        {props.label}
      </TimeFieldLabel>
      <TimeField state={datefield} className="timefield__field">
        {state.segments.map((segment, i) => (
          <TimeSegment
            key={i}
            segment={segment}
            state={state}
            className={`timefield__field--item ${
              segment.isPlaceholder ? "placeholder" : ""
            }`}
          >
            {segment.text}
          </TimeSegment>
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </TimeField>
    </div>
  );
};

export default TimeFieldBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/TimeField-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ob4nmi)
[![Edit CodeSandbox](https://img.shields.io/badge/TimeField%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/groum6)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/TimeField%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/dqnhrr)
[![Edit CodeSandbox](https://img.shields.io/badge/TimeField%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/qnb2te)

## Composition

- TimeSegment uses `Role`
- TimeField uses `Role`
- useTimeFieldBaseState uses its own state
- TimeFieldDescription uses `Role`
- TimeFieldErrorMessage uses `Role`
- TimeFieldLabel uses `Role`
- useTimeFieldState uses its own state

## Props

### `TimeSegmentOptions`

| Name          | Type                        | Description                                          |
| :------------ | :-------------------------- | :--------------------------------------------------- |
| **`segment`** | <code>DateSegment</code>    |                                                      |
| **`state`**   | <code>DateFieldState</code> | Object returned by the `useTimeFieldBaseState` hook. |

### `TimeFieldOptions`

| Name        | Type                        | Description                                      |
| :---------- | :-------------------------- | :----------------------------------------------- |
| **`state`** | <code>TimeFieldState</code> | Object returned by the `useTimeFieldState` hook. |

### `TimeFieldBaseStateProps`

| Name                   | Type                                                                                                                                                                                                     | Description                                                                                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`locale`**           | <code>string</code>                                                                                                                                                                                      | The locale to display and edit the value according to.                                                                                                      |
| **`hourCycle`**        | <code>12 \| 24 \| undefined</code>                                                                                                                                                                       | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.                                                   |
| **`granularity`**      | <code title="&#34;hour&#34; \| &#34;minute&#34; \| &#34;second&#34; \| &#34;millisecond&#34; \| undefined">&#34;hour&#34; \| &#34;minute&#34; \| &#34;second&#34; \| &#34;millisecond&#34; \| ...</code> | Determines the smallest unit that is displayed in the time picker.                                                                                          |
| **`hideTimeZone`**     | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether to hide the time zone abbreviation.                                                                                                                 |
| **`placeholderValue`** | <code>T \| undefined</code>                                                                                                                                                                              | A placeholder time that influences the format of the placeholder shown when no value is selected.Defaults to 12:00 AM or 00:00 depending on the hour cycle. |
| **`minValue`**         | <code>TimeValue \| undefined</code>                                                                                                                                                                      | The minimum allowed time that a user may select.                                                                                                            |
| **`maxValue`**         | <code>TimeValue \| undefined</code>                                                                                                                                                                      | The maximum allowed time that a user may select.                                                                                                            |
| **`isDisabled`**       | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether the input is disabled.                                                                                                                              |
| **`isReadOnly`**       | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether the input can be selected but not changed by the user.                                                                                              |
| **`validationState`**  | <code>ValidationState \| undefined</code>                                                                                                                                                                | Whether the input should display its "valid" or "invalid" visual styling.                                                                                   |
| **`isRequired`**       | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input.  |
| **`autoFocus`**        | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether the element should receive focus on render.                                                                                                         |
| **`onFocus`**          | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code>                                                | Handler that is called when the element receives focus.                                                                                                     |
| **`onBlur`**           | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code>                                                | Handler that is called when the element loses focus.                                                                                                        |
| **`onFocusChange`**    | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                                                                             | Handler that is called when the element's focus status changes.                                                                                             |
| **`onKeyDown`**        | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                                                               | Handler that is called when a key is pressed.                                                                                                               |
| **`onKeyUp`**          | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                                                               | Handler that is called when a key is released.                                                                                                              |
| **`label`**            | <code>ReactNode</code>                                                                                                                                                                                   | The content to display as the label.                                                                                                                        |
| **`description`**      | <code>ReactNode</code>                                                                                                                                                                                   | A description for the field. Provides a hint such as specific requirements for what to choose.                                                              |
| **`errorMessage`**     | <code>ReactNode</code>                                                                                                                                                                                   | An error message for the field.                                                                                                                             |
| **`value`**            | <code>T \| undefined</code>                                                                                                                                                                              | The current value (controlled).                                                                                                                             |
| **`defaultValue`**     | <code>T \| undefined</code>                                                                                                                                                                              | The default value (uncontrolled).                                                                                                                           |
| **`onChange`**         | <code>((value: C) =&#62; void) \| undefined</code>                                                                                                                                                       | Handler that is called when the value changes.                                                                                                              |

### `TimeFieldDescriptionOptions`

| Name        | Type                        | Description                                      |
| :---------- | :-------------------------- | :----------------------------------------------- |
| **`state`** | <code>TimeFieldState</code> | Object returned by the `useTimeFieldState` hook. |

### `TimeFieldErrorMessageOptions`

| Name        | Type                        | Description                                      |
| :---------- | :-------------------------- | :----------------------------------------------- |
| **`state`** | <code>TimeFieldState</code> | Object returned by the `useTimeFieldState` hook. |

### `TimeFieldLabelOptions`

| Name        | Type                        | Description                                      |
| :---------- | :-------------------------- | :----------------------------------------------- |
| **`state`** | <code>TimeFieldState</code> | Object returned by the `useTimeFieldState` hook. |

### `TimeFieldStateProps`

| Name                   | Type                                                                                                                                                                                                     | Description                                                                                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`hourCycle`**        | <code>12 \| 24 \| undefined</code>                                                                                                                                                                       | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.                                                   |
| **`granularity`**      | <code title="&#34;hour&#34; \| &#34;minute&#34; \| &#34;second&#34; \| &#34;millisecond&#34; \| undefined">&#34;hour&#34; \| &#34;minute&#34; \| &#34;second&#34; \| &#34;millisecond&#34; \| ...</code> | Determines the smallest unit that is displayed in the time picker.                                                                                          |
| **`hideTimeZone`**     | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether to hide the time zone abbreviation.                                                                                                                 |
| **`placeholderValue`** | <code>T \| undefined</code>                                                                                                                                                                              | A placeholder time that influences the format of the placeholder shown when no value is selected.Defaults to 12:00 AM or 00:00 depending on the hour cycle. |
| **`minValue`**         | <code>TimeValue \| undefined</code>                                                                                                                                                                      | The minimum allowed time that a user may select.                                                                                                            |
| **`maxValue`**         | <code>TimeValue \| undefined</code>                                                                                                                                                                      | The maximum allowed time that a user may select.                                                                                                            |
| **`isDisabled`**       | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether the input is disabled.                                                                                                                              |
| **`isReadOnly`**       | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether the input can be selected but not changed by the user.                                                                                              |
| **`validationState`**  | <code>ValidationState \| undefined</code>                                                                                                                                                                | Whether the input should display its "valid" or "invalid" visual styling.                                                                                   |
| **`isRequired`**       | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input.  |
| **`autoFocus`**        | <code>boolean \| undefined</code>                                                                                                                                                                        | Whether the element should receive focus on render.                                                                                                         |
| **`onFocus`**          | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code>                                                | Handler that is called when the element receives focus.                                                                                                     |
| **`onBlur`**           | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code>                                                | Handler that is called when the element loses focus.                                                                                                        |
| **`onFocusChange`**    | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                                                                             | Handler that is called when the element's focus status changes.                                                                                             |
| **`onKeyDown`**        | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                                                               | Handler that is called when a key is pressed.                                                                                                               |
| **`onKeyUp`**          | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                                                               | Handler that is called when a key is released.                                                                                                              |
| **`label`**            | <code>ReactNode</code>                                                                                                                                                                                   | The content to display as the label.                                                                                                                        |
| **`description`**      | <code>ReactNode</code>                                                                                                                                                                                   | A description for the field. Provides a hint such as specific requirements for what to choose.                                                              |
| **`errorMessage`**     | <code>ReactNode</code>                                                                                                                                                                                   | An error message for the field.                                                                                                                             |
| **`value`**            | <code>T \| undefined</code>                                                                                                                                                                              | The current value (controlled).                                                                                                                             |
| **`defaultValue`**     | <code>T \| undefined</code>                                                                                                                                                                              | The default value (uncontrolled).                                                                                                                           |
| **`onChange`**         | <code>((value: C) =&#62; void) \| undefined</code>                                                                                                                                                       | Handler that is called when the value changes.                                                                                                              |
| **`aria-label`**       | <code>string \| undefined</code>                                                                                                                                                                         | Defines a string value that labels the current element.                                                                                                     |
| **`aria-labelledby`**  | <code>string \| undefined</code>                                                                                                                                                                         | Identifies the element (or elements) that labels the current element.                                                                                       |
| **`aria-describedby`** | <code>string \| undefined</code>                                                                                                                                                                         | Identifies the element (or elements) that describes the object.                                                                                             |
| **`aria-details`**     | <code>string \| undefined</code>                                                                                                                                                                         | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                          |
| **`id`**               | <code>string \| undefined</code>                                                                                                                                                                         | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                         |
| **`state`**            | <code>DateFieldState</code>                                                                                                                                                                              | Object returned by the `useTimeFieldBaseState` hook.                                                                                                        |
