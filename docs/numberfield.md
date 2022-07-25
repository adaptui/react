# NumberField

`NumberField` component is a form element used to select a number while
following the keyboard interactions & accessibility properties like the
[Native Number Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
It follows
[WAI-ARIA Spin Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)
for the
[keyboard interactions](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/#:~:text=month%2C%20and%20year.-,Keyboard%20Interaction,-Up%20Arrow)
and
[accessibility features](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/#:~:text=to%20perform%20them.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-The%20focusable%20element).
Supports all the features as React Aria's
[useNumberField](https://react-spectrum.adobe.com/react-aria/useNumberField.html#features).

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`NumberFieldBaseStateProps`](#numberfieldbasestateprops)
  - [`NumberFieldDecrementButtonOptions`](#numberfielddecrementbuttonoptions)
  - [`NumberFieldGroupOptions`](#numberfieldgroupoptions)
  - [`NumberFieldIncrementButtonOptions`](#numberfieldincrementbuttonoptions)
  - [`NumberFieldInputOptions`](#numberfieldinputoptions)
  - [`NumberFieldLabelOptions`](#numberfieldlabeloptions)
  - [`NumberFieldStateProps`](#numberfieldstateprops)

## Usage

```js
import * as React from "react";
import { useLocale } from "@react-aria/i18n";

import {
  NumberFieldDecrementButton,
  NumberFieldGroup,
  NumberFieldIncrementButton,
  NumberFieldInput,
  NumberFieldLabel,
  useNumberFieldBaseState,
  useNumberFieldState,
} from "@adaptui/react";

export const NumberFieldBasic = props => {
  let { locale } = useLocale();
  const baseState = useNumberFieldBaseState({ ...props, locale });
  const state = useNumberFieldState({ ...props, state: baseState });

  return (
    <div>
      <NumberFieldLabel state={state}>NumberField</NumberFieldLabel>
      <NumberFieldGroup state={state}>
        <NumberFieldDecrementButton state={state}>-</NumberFieldDecrementButton>
        <NumberFieldInput state={state} />
        <NumberFieldIncrementButton state={state}>+</NumberFieldIncrementButton>
      </NumberFieldGroup>
    </div>
  );
};

export default NumberFieldBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/NumberField-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/fupnwo)
[![Edit CodeSandbox](https://img.shields.io/badge/NumberField%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/wy5ded)

## Composition

- useNumberFieldBaseState uses `useNumberFieldState`
- NumberFieldDecrementButton uses `Role`
- NumberFieldGroup uses `Role`
- NumberFieldIncrementButton uses `Role`
- NumberFieldInput uses `Role`
- NumberFieldLabel uses `Role`
- useNumberFieldState uses its own state

## Props

### `NumberFieldBaseStateProps`

| Name         | Type                | Description                                 |
| :----------- | :------------------ | :------------------------------------------ |
| **`locale`** | <code>string</code> | The locale that should be used for parsing. |

<details><summary>NumberFieldStateProps props</summary>
> These props are returned by the other props You can also provide these props.

| Name                  | Type                                                                                                                                                      | Description                                                                                                                                                |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`formatOptions`**   | <code>NumberFormatOptions \| undefined</code>                                                                                                             | Formatting options for the value displayed in the number field.This also affects what characters are allowed to be typed by the user.                      |
| **`isDisabled`**      | <code>boolean \| undefined</code>                                                                                                                         | Whether the input is disabled.                                                                                                                             |
| **`isReadOnly`**      | <code>boolean \| undefined</code>                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                             |
| **`validationState`** | <code>ValidationState \| undefined</code>                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                  |
| **`isRequired`**      | <code>boolean \| undefined</code>                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input. |
| **`autoFocus`**       | <code>boolean \| undefined</code>                                                                                                                         | Whether the element should receive focus on render.                                                                                                        |
| **`onFocus`**         | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element receives focus.                                                                                                    |
| **`onBlur`**          | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element loses focus.                                                                                                       |
| **`onFocusChange`**   | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                              | Handler that is called when the element's focus status changes.                                                                                            |
| **`onKeyDown`**       | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is pressed.                                                                                                              |
| **`onKeyUp`**         | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is released.                                                                                                             |
| **`placeholder`**     | <code>string \| undefined</code>                                                                                                                          | Temporary text that occupies the text input when it is empty.                                                                                              |
| **`value`**           | <code>T \| undefined</code>                                                                                                                               | The current value (controlled).                                                                                                                            |
| **`defaultValue`**    | <code>T \| undefined</code>                                                                                                                               | The default value (uncontrolled).                                                                                                                          |
| **`onChange`**        | <code>((value: C) =&#62; void) \| undefined</code>                                                                                                        | Handler that is called when the value changes.                                                                                                             |
| **`minValue`**        | <code>T \| undefined</code>                                                                                                                               | The smallest value allowed for the input.                                                                                                                  |
| **`maxValue`**        | <code>T \| undefined</code>                                                                                                                               | The largest value allowed for the input.                                                                                                                   |
| **`step`**            | <code>T \| undefined</code>                                                                                                                               | The amount that the input value changes with each increment or decrement "tick".                                                                           |
| **`label`**           | <code>ReactNode</code>                                                                                                                                    | The content to display as the label.                                                                                                                       |
| **`description`**     | <code>ReactNode</code>                                                                                                                                    | A description for the field. Provides a hint such as specific requirements for what to choose.                                                             |
| **`errorMessage`**    | <code>ReactNode</code>                                                                                                                                    | An error message for the field.                                                                                                                            |

</details>

### `NumberFieldDecrementButtonOptions`

| Name        | Type                          | Description                                        |
| :---------- | :---------------------------- | :------------------------------------------------- |
| **`state`** | <code>NumberFieldState</code> | Object returned by the `useNumberFieldState` hook. |

### `NumberFieldGroupOptions`

| Name        | Type                          | Description                                        |
| :---------- | :---------------------------- | :------------------------------------------------- |
| **`state`** | <code>NumberFieldState</code> | Object returned by the `useNumberFieldState` hook. |

### `NumberFieldIncrementButtonOptions`

| Name        | Type                          | Description                                        |
| :---------- | :---------------------------- | :------------------------------------------------- |
| **`state`** | <code>NumberFieldState</code> | Object returned by the `useNumberFieldState` hook. |

### `NumberFieldInputOptions`

| Name        | Type                          | Description                                        |
| :---------- | :---------------------------- | :------------------------------------------------- |
| **`state`** | <code>NumberFieldState</code> | Object returned by the `useNumberFieldState` hook. |

### `NumberFieldLabelOptions`

| Name        | Type                          | Description                                        |
| :---------- | :---------------------------- | :------------------------------------------------- |
| **`state`** | <code>NumberFieldState</code> | Object returned by the `useNumberFieldState` hook. |

### `NumberFieldStateProps`

| Name                      | Type                                                                                                                                            | Description                                                                                                                                                                                                |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`decrementAriaLabel`**  | <code>string \| undefined</code>                                                                                                                | A custom aria-label for the decrement button. If not provided, the localized string "Decrement" is used.                                                                                                   |
| **`incrementAriaLabel`**  | <code>string \| undefined</code>                                                                                                                | A custom aria-label for the increment button. If not provided, the localized string "Increment" is used.                                                                                                   |
| **`id`**                  | <code>string \| undefined</code>                                                                                                                | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                        |
| **`aria-label`**          | <code>string \| undefined</code>                                                                                                                | Defines a string value that labels the current element.                                                                                                                                                    |
| **`aria-labelledby`**     | <code>string \| undefined</code>                                                                                                                | Identifies the element (or elements) that labels the current element.                                                                                                                                      |
| **`aria-describedby`**    | <code>string \| undefined</code>                                                                                                                | Identifies the element (or elements) that describes the object.                                                                                                                                            |
| **`aria-details`**        | <code>string \| undefined</code>                                                                                                                | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                         |
| **`onCopy`**              | <code title="ClipboardEventHandler&#60;HTMLInputElement&#62; \| undefined">ClipboardEventHandler&#60;HTMLInputElement&#62; \| undef...</code>   | Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).                                                                          |
| **`onCut`**               | <code title="ClipboardEventHandler&#60;HTMLInputElement&#62; \| undefined">ClipboardEventHandler&#60;HTMLInputElement&#62; \| undef...</code>   | Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut).                                                                             |
| **`onPaste`**             | <code title="ClipboardEventHandler&#60;HTMLInputElement&#62; \| undefined">ClipboardEventHandler&#60;HTMLInputElement&#62; \| undef...</code>   | Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste).                                                                         |
| **`onCompositionStart`**  | <code title="CompositionEventHandler&#60;HTMLInputElement&#62; \| undefined">CompositionEventHandler&#60;HTMLInputElement&#62; \| und...</code> | Handler that is called when a text composition system starts a new text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).                   |
| **`onCompositionEnd`**    | <code title="CompositionEventHandler&#60;HTMLInputElement&#62; \| undefined">CompositionEventHandler&#60;HTMLInputElement&#62; \| und...</code> | Handler that is called when a text composition system completes or cancels the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event). |
| **`onCompositionUpdate`** | <code title="CompositionEventHandler&#60;HTMLInputElement&#62; \| undefined">CompositionEventHandler&#60;HTMLInputElement&#62; \| und...</code> | Handler that is called when a new character is received in the current text composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).              |
| **`onSelect`**            | <code>ReactEventHandler&#60;HTMLInputElement&#62; \| undefined</code>                                                                           | Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).                                                               |
| **`onBeforeInput`**       | <code>FormEventHandler&#60;HTMLInputElement&#62; \| undefined</code>                                                                            | Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).                                            |
| **`onInput`**             | <code>FormEventHandler&#60;HTMLInputElement&#62; \| undefined</code>                                                                            | Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).                                                              |
| **`state`**               | <code>NumberFieldState</code>                                                                                                                   | Object returned by the `useNumberFieldBaseState` hook.                                                                                                                                                     |
