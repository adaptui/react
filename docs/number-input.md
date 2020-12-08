# NumberInput

`NumberInput` component is a form element used to select a number while
following the keyboard interactions & accessibility properties like the
[Native Number Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
It follows
[WAI-ARIA Spin Button Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton)
for the accessibility features.

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`useNumberinputState`](#usenumberinputstate)
  - [`NumberInput`](#numberinput)
  - [`NumberInputDecrementButton`](#numberinputdecrementbutton)
  - [`NumberInputIncrementButton`](#numberinputincrementbutton)

## Usage

```js
import * as React from "react";

import {
  NumberInput,
  useNumberInputState,
  NumberInputDecrementButton,
  NumberInputIncrementButton,
} from "@renderlesskit/react";

export const App = props => {
  const state = useNumberInputState(props);
  const { clampValueOnBlur, allowMouseWheel } = props;

  return (
    <label htmlFor="number-input" id="numberinput-label">
      <NumberInputDecrementButton {...state}>-</NumberInputDecrementButton>
      <NumberInput
        id="number-input"
        aria-labelledby="numberinput-label"
        clampValueOnBlur={clampValueOnBlur}
        allowMouseWheel={allowMouseWheel}
        {...state}
      />
      <NumberInputIncrementButton {...state}>+</NumberInputIncrementButton>
    </label>
  );
};

export default App;
```

[NumberInput - Open On Sandbox](https://codesandbox.io/s/j0wly)

## Accessibility Requirement

- `NumberInput` should have `aria-label` or `aria-labelledby` attribute.

## Composition

- NumberInput uses [useInput](https://reakit.io/docs/input/)
- NumberInputDecrementButton uses [useButton](https://reakit.io/docs/button)
- NumberInputIncrementButton uses [useButton](https://reakit.io/docs/button)

## Props

### `useNumberinputState`

| Name                     | Type                                                                                                                                              | Description                                                                                                                                                                                                                         |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**              | <code>string \| number</code>                                                                                                                     | The value of the counter. Should be less than `max` and greater than `min`If no value, initial value is set to `""`                                                                                                                 |
| **`keepWithinRange`**    | <code>boolean</code>                                                                                                                              | This controls the value update behavior in general.- If `true` and you use the stepper or up/down arrow keys, the value will not exceed the `max` or go lower than `min`- If `false`, the value will be allowed to go out of range. |
| **`min`**                | <code>number</code>                                                                                                                               | The minimum value of the counter                                                                                                                                                                                                    |
| **`max`**                | <code>number</code>                                                                                                                               | The maximum value of the counter                                                                                                                                                                                                    |
| **`step`**               | <code>number</code>                                                                                                                               | The step used to increment or decrement the value                                                                                                                                                                                   |
| **`precision`**          | <code>number</code>                                                                                                                               | The number of decimal points used to round the valueIf no precision, initial value is from the decimal places from value/step - `0`                                                                                                 |
| **`defaultValue`**       | <code>string \| number \| undefined</code>                                                                                                        | The initial value of the counter. Should be less than `max` and greater than `min`                                                                                                                                                  |
| **`onChange`**           | <code title="((valueAsString: string, valueAsNumber: number) =&#62; void) \| undefined">((valueAsString: string, valueAsNumber: number)...</code> | The callback fired when the value changes                                                                                                                                                                                           |
| **`focusInputOnChange`** | <code>boolean \| undefined</code>                                                                                                                 | If `true`, the input will be focused as you incrementor decrement the value with the stepper                                                                                                                                        |

### `NumberInput`

| Name                   | Type                              | Description                                                                                                                                                                        |
| :--------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**         | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                                        |
| **`focusable`**        | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set.                       |
| **`clampValueOnBlur`** | <code>boolean \| undefined</code> | This controls the value update when you blur out of the input.- If `true` and the value is greater than `max`, the value will be reset to `max`- Else, the value remains the same. |
| **`allowMouseWheel`**  | <code>boolean \| undefined</code> | If `true`, the input's value will change based on mouse wheel                                                                                                                      |

<details><summary>12 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                  | Type                                                | Description                                                                                                                                                                                                                         |
| :-------------------- | :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`keepWithinRange`** | <code>boolean</code>                                | This controls the value update behavior in general.- If `true` and you use the stepper or up/down arrow keys, the value will not exceed the `max` or go lower than `min`- If `false`, the value will be allowed to go out of range. |
| **`value`**           | <code>string \| number</code>                       | The value of the counter. Should be less than `max` and greater than `min`If no value, initial value is set to `""`                                                                                                                 |
| **`min`**             | <code>number</code>                                 | The minimum value of the counter                                                                                                                                                                                                    |
| **`max`**             | <code>number</code>                                 | The maximum value of the counter                                                                                                                                                                                                    |
| **`step`**            | <code>number</code>                                 | The step used to increment or decrement the value                                                                                                                                                                                   |
| **`valueAsNumber`**   | <code>number</code>                                 | The value of the counter in number.                                                                                                                                                                                                 |
| **`isOutOfRange`**    | <code>boolean</code>                                | True, if value is less than `min` & greater than `max`.                                                                                                                                                                             |
| **`inputRef`**        | <code>RefObject&#60;HTMLElement \| null&#62;</code> | The Input Element.                                                                                                                                                                                                                  |
| **`setValue`**        | <code>(next: StringOrNumber) =&#62; void</code>     | Set the value which will be converted to string.                                                                                                                                                                                    |
| **`increment`**       | <code>(step: number) =&#62; void</code>             | Increment the value based on the step                                                                                                                                                                                               |
| **`decrement`**       | <code>(step: number) =&#62; void</code>             | Decrement the value based on the step                                                                                                                                                                                               |
| **`setCastedValue`**  | <code>(value: StringOrNumber) =&#62; void</code>    | Set the casted value based on precision & step.                                                                                                                                                                                     |

</details>

### `NumberInputDecrementButton`

| Name            | Type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |

<details><summary>5 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                  | Type                        | Description                                                                                                                                                                                                                         |
| :-------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`keepWithinRange`** | <code>boolean</code>        | This controls the value update behavior in general.- If `true` and you use the stepper or up/down arrow keys, the value will not exceed the `max` or go lower than `min`- If `false`, the value will be allowed to go out of range. |
| **`isAtMin`**         | <code>boolean</code>        | Truw, if value is equal to min.                                                                                                                                                                                                     |
| **`focusInput`**      | <code>() =&#62; void</code> | Focus input if focus input on value change is `true`                                                                                                                                                                                |
| **`spinDown`**        | <code>() =&#62; void</code> | Spinner handler that decrements the value after an interval                                                                                                                                                                         |
| **`spinStop`**        | <code>() =&#62; void</code> | Spinner handler that Stop it from incrementing or decrementing                                                                                                                                                                      |

</details>

### `NumberInputIncrementButton`

| Name            | Type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |

<details><summary>5 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                  | Type                        | Description                                                                                                                                                                                                                         |
| :-------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`keepWithinRange`** | <code>boolean</code>        | This controls the value update behavior in general.- If `true` and you use the stepper or up/down arrow keys, the value will not exceed the `max` or go lower than `min`- If `false`, the value will be allowed to go out of range. |
| **`isAtMax`**         | <code>boolean</code>        | True, if value is equal to max.                                                                                                                                                                                                     |
| **`focusInput`**      | <code>() =&#62; void</code> | Focus input if focus input on value change is `true`                                                                                                                                                                                |
| **`spinUp`**          | <code>() =&#62; void</code> | Spinner handler that increments the value after an interval                                                                                                                                                                         |
| **`spinStop`**        | <code>() =&#62; void</code> | Spinner handler that Stop it from incrementing or decrementing                                                                                                                                                                      |

</details>
