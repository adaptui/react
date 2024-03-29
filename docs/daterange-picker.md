# DateRangePicker

`DateRangePicker` component provides a way to select a a range of dates using
[DateField](./datefield) & [Calendar](./calendar.md) component. It follows the
[Native Input Date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
for the keyboard navigation & accessibility features. Supports all the features
as React Aria's
[useDateRangePicker](https://react-spectrum.adobe.com/react-aria/useDateRangePicker.html#features).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`DateRangePickerBaseStateProps`](#daterangepickerbasestateprops)
  - [`DateRangePickerStateProps`](#daterangepickerstateprops)

## Usage

```js
import React from "react";

import DateFieldBasic from "./DateFieldBasic.component";
import {
  DatePickerDisclosure,
  DatePickerGroup,
  DatePickerLabel,
  DatePickerPopover,
  useDateRangePickerBaseState,
  useDateRangePickerState,
} from "@adaptui/react";
import CalendarRange from "./RangeCalendarBasic.component";

import { CalendarIcon } from "./Utils.component";

export const DateRangePickerBasic = props => {
  const state = useDateRangePickerBaseState({ ...props, gutter: 10 });
  const daterangepicker = useDateRangePickerState({ ...props, state });

  return (
    <div className="datepicker">
      <DatePickerLabel state={daterangepicker} className="datepicker__label">
        {props.label}
      </DatePickerLabel>
      <DatePickerGroup state={daterangepicker} className="datepicker__group">
        <DateFieldBasic {...daterangepicker.startFieldProps} />
        <DateFieldBasic {...daterangepicker.endFieldProps} />
        <DatePickerDisclosure
          state={daterangepicker}
          className="datepicker__trigger"
        >
          <CalendarIcon />
        </DatePickerDisclosure>
      </DatePickerGroup>
      {state.popover.open && (
        <DatePickerPopover state={daterangepicker} className="popover">
          <CalendarRange {...daterangepicker.calendarProps} />
        </DatePickerPopover>
      )}
    </div>
  );
};

export default DateRangePickerBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/DateRangePicker-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/bm0vdv)
[![Edit CodeSandbox](https://img.shields.io/badge/DateRangePicker%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/snfjfx)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/DateRangePicker%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/7kt98q)
[![Edit CodeSandbox](https://img.shields.io/badge/DateRangePicker%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/9t5mh1)

## Composition

- useDateRangePickerBaseState uses `useDateRangePickerState` and
  `usePopoverState`
- useDateRangePickerState uses its own state

## Props

### `DateRangePickerBaseStateProps`

<details><summary>DateRangePickerStateProps props</summary>
> These props are returned by the other props You can also provide these props.

| Name                            | Type                                                                                                                                                      | Description                                                                                                                                                |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`shouldCloseOnSelect`**       | <code>boolean \| (() =&#62; boolean) \| undefined</code>                                                                                                  | Determines whether the date picker popover should close automatically when a date is selected.                                                             |
| **`allowsNonContiguousRanges`** | <code>boolean \| undefined</code>                                                                                                                         | When combined with `isDateUnavailable`, determines whether non-contiguous ranges,i.e. ranges containing unavailable dates, may be selected.                |
| **`minValue`**                  | <code>DateValue \| undefined</code>                                                                                                                       | The minimum allowed date that a user may select.                                                                                                           |
| **`maxValue`**                  | <code>DateValue \| undefined</code>                                                                                                                       | The maximum allowed date that a user may select.                                                                                                           |
| **`isDateUnavailable`**         | <code>((date: DateValue) =&#62; boolean) \| undefined</code>                                                                                              | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.                                                   |
| **`placeholderValue`**          | <code>T \| undefined</code>                                                                                                                               | A placeholder date that influences the format of the placeholder shown when no value is selected. Defaults to today's date at midnight.                    |
| **`hourCycle`**                 | <code>12 \| 24 \| undefined</code>                                                                                                                        | Whether to display the time in 12 or 24 hour format. By default, this is determined by the user's locale.                                                  |
| **`granularity`**               | <code>Granularity \| undefined</code>                                                                                                                     | Determines the smallest unit that is displayed in the date picker. By default, this is `"day"` for dates, and `"minute"` for times.                        |
| **`hideTimeZone`**              | <code>boolean \| undefined</code>                                                                                                                         | Whether to hide the time zone abbreviation.                                                                                                                |
| **`isDisabled`**                | <code>boolean \| undefined</code>                                                                                                                         | Whether the input is disabled.                                                                                                                             |
| **`isReadOnly`**                | <code>boolean \| undefined</code>                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                             |
| **`validationState`**           | <code>ValidationState \| undefined</code>                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                  |
| **`isRequired`**                | <code>boolean \| undefined</code>                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input. |
| **`autoFocus`**                 | <code>boolean \| undefined</code>                                                                                                                         | Whether the element should receive focus on render.                                                                                                        |
| **`onFocus`**                   | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element receives focus.                                                                                                    |
| **`onBlur`**                    | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element loses focus.                                                                                                       |
| **`onFocusChange`**             | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                              | Handler that is called when the element's focus status changes.                                                                                            |
| **`onKeyDown`**                 | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is pressed.                                                                                                              |
| **`onKeyUp`**                   | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is released.                                                                                                             |
| **`label`**                     | <code>ReactNode</code>                                                                                                                                    | The content to display as the label.                                                                                                                       |
| **`description`**               | <code>ReactNode</code>                                                                                                                                    | A description for the field. Provides a hint such as specific requirements for what to choose.                                                             |
| **`errorMessage`**              | <code>ReactNode</code>                                                                                                                                    | An error message for the field.                                                                                                                            |
| **`isOpen`**                    | <code>boolean \| undefined</code>                                                                                                                         | Whether the overlay is open by default (controlled).                                                                                                       |
| **`defaultOpen`**               | <code>boolean \| undefined</code>                                                                                                                         | Whether the overlay is open by default (uncontrolled).                                                                                                     |
| **`onOpenChange`**              | <code>((isOpen: boolean) =&#62; void) \| undefined</code>                                                                                                 | Handler that is called when the overlay's open state changes.                                                                                              |
| **`value`**                     | <code>T \| undefined</code>                                                                                                                               | The current value (controlled).                                                                                                                            |
| **`defaultValue`**              | <code>T \| undefined</code>                                                                                                                               | The default value (uncontrolled).                                                                                                                          |
| **`onChange`**                  | <code>((value: C) =&#62; void) \| undefined</code>                                                                                                        | Handler that is called when the value changes.                                                                                                             |

</details>

<details><summary>PopoverStateProps props</summary>
> These props are returned by the other props You can also provide these props.

| Name                  | Type                                                                                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`defaultOpen`**     | <code>boolean \| undefined</code>                                                                                                                                   | Whether the overlay is open by default (uncontrolled).                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`open`**            | <code>boolean</code>                                                                                                                                                | The visibility state of the content.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`animated`**        | <code>number \| boolean</code>                                                                                                                                      | Determines whether the content should animate when it is shown or hidden. - If `true`, the `animating` state will be `true` when the content is shown or hidden and it will wait for `stopAnimation` to be called or a CSS animation/transition to end before becoming `false`. - If it's set to a number, the `animating` state will be `true` when the content is shown or hidden and it will wait for the number of milliseconds to pass before becoming `false`. |
| **`setOpen`**         | <code>((open: boolean) =&#62; void) \| undefined</code>                                                                                                             | Function that will be called when setting the disclosure `open` state.                                                                                                                                                                                                                                                                                                                                                                                               |
| **`getAnchorRect`**   | <code>(anchor: HTMLElement \| null) =&#62; AnchorRect \| null</code>                                                                                                | Function that returns the anchor element's DOMRect. If this is explicitlypassed, it will override the anchor `getBoundingClientRect` method.                                                                                                                                                                                                                                                                                                                         |
| **`placement`**       | <code>Placement</code>                                                                                                                                              | The placement of the popover.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`fixed`**           | <code>boolean</code>                                                                                                                                                | Whether the popover has `position: fixed` or not.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`gutter`**          | <code>number \| undefined</code>                                                                                                                                    | The distance between the popover and the anchor element. By default, it's 0plus half of the arrow offset, if it exists.                                                                                                                                                                                                                                                                                                                                              |
| **`shift`**           | <code>number</code>                                                                                                                                                 | The skidding of the popover along the anchor element.                                                                                                                                                                                                                                                                                                                                                                                                                |
| **`flip`**            | <code>string \| boolean</code>                                                                                                                                      | Controls the behavior of the popover when it overflows the viewport: - If a `boolean`, specifies whether the popover should flip to the opposite side when it overflows. - If a `string`, indicates the preferred fallback placements when it overflows. The placements must be spaced-delimited, e.g. "top left".                                                                                                                                                   |
| **`slide`**           | <code>boolean</code>                                                                                                                                                | Whether the popover should slide when it overflows.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`overlap`**         | <code>boolean</code>                                                                                                                                                | Whether the popover can overlap the anchor element when it overflows.                                                                                                                                                                                                                                                                                                                                                                                                |
| **`sameWidth`**       | <code>boolean</code>                                                                                                                                                | Whether the popover should have the same width as the anchor element. Thiswill be exposed to CSS as `--popover-anchor-width`.                                                                                                                                                                                                                                                                                                                                        |
| **`fitViewport`**     | <code>boolean</code>                                                                                                                                                | Whether the popover should fit the viewport. If this is set to true, thepopover wrapper will have `maxWidth` and `maxHeight` set to the viewportsize. This will be exposed to CSS as `--popover-available-width` and`--popover-available-height`.                                                                                                                                                                                                                    |
| **`arrowPadding`**    | <code>number</code>                                                                                                                                                 | The minimum padding between the arrow and the popover corner.                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`overflowPadding`** | <code>number</code>                                                                                                                                                 | The minimum padding between the popover and the viewport edge. This will beexposed to CSS as `--popover-overflow-padding`.                                                                                                                                                                                                                                                                                                                                           |
| **`renderCallback`**  | <code title="((props: PopoverStateRenderCallbackProps) =&#62; void \| (() =&#62; void)) \| undefined">((props: PopoverStateRenderCallbackProps) =&#62; vo...</code> | A function that will be called when the popover needs to calculate itsstyles. It will override the internal behavior.                                                                                                                                                                                                                                                                                                                                                |

</details>

### `DateRangePickerStateProps`

| Name                   | Type                                  | Description                                                                                                         |
| :--------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| **`aria-label`**       | <code>string \| undefined</code>      | Defines a string value that labels the current element.                                                             |
| **`aria-labelledby`**  | <code>string \| undefined</code>      | Identifies the element (or elements) that labels the current element.                                               |
| **`aria-describedby`** | <code>string \| undefined</code>      | Identifies the element (or elements) that describes the object.                                                     |
| **`aria-details`**     | <code>string \| undefined</code>      | Identifies the element (or elements) that provide a detailed, extended description for the object.                  |
| **`id`**               | <code>string \| undefined</code>      | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| **`state`**            | <code>DateRangePickerBaseState</code> | Object returned by the `useDateRangePickerBaseState` hook.                                                          |
