# Slider

`Slider` component is a form element used to select a number by sliding through
the given range with complete freedom of styling. It follows
[WAI-ARIA Slider Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#slider)
for the
[keyboard navigation](https://www.w3.org/TR/wai-aria-practices-1.2/#slider_kbd_interaction)
&
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#slider_roles_states_props)

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`useSliderState`](#usesliderstate)
  - [`SliderInput`](#sliderinput)
  - [`SliderThumb`](#sliderthumb)
  - [`SliderTrack`](#slidertrack)

## Usage

```js
import * as React from "react";
import { VisuallyHidden } from "reakit";

import {
  SliderTrack,
  SliderThumb,
  SliderInput,
  useSliderState,
} from "@renderlesskit/react";

export const App = args => {
  const { label, ...rest } = args;

  const state = useSliderState(rest);
  const {
    values,
    getValuePercent,
    getThumbValueLabel,
    getThumbPercent,
  } = state;

  return (
    <div
      className="chakra-slider-group"
      role="group"
      aria-labelledby="styled-slider"
    >
      <div className="slider-label">
        <label className="label" id="styled-slider">
          {`${args.label ? args.label : "Styled"} Slider`}
        </label>
        <div className="value">{getThumbValueLabel(0)}</div>
      </div>

      <div className="slider">
        <SliderTrack {...state} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{ width: `${getValuePercent(values[0]) * 100}%` }}
          />
        </SliderTrack>
        <div
          className="slider-thumb"
          style={{ left: `calc(${getThumbPercent(0) * 100}% - 7px)` }}
        >
          <SliderThumb {...state} index={0} className="slider-thumb-handle">
            <VisuallyHidden>
              <SliderInput
                index={0}
                aria-label={`Thumb-${0}`}
                aria-labelledby="styled-slider"
                {...state}
              />
            </VisuallyHidden>
          </SliderThumb>
          {args.showTip && (
            <div className="slider-thumb-tip">{getThumbValueLabel(0)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
```

[Single Slider - Open On Sandbox](https://codesandbox.io/s/y9flc)

[Single Origin Slider - Open On Sandbox](https://codesandbox.io/s/gx8g9)

[Single Reversed Slider - Open On Sandbox](https://codesandbox.io/s/imb5z)

[Single Vertical Slider - Open On Sandbox](https://codesandbox.io/s/cucsm)

[Range Slider - Open On Sandbox](https://codesandbox.io/s/hqgi1)

[Multi Slider - Open On Sandbox](https://codesandbox.io/s/megin)

## Accessibility Requirement

- `SliderInput` should have `aria-label` or `aria-labelledby` attribute.

## Composition

- SliderInput uses [unstable_useId](https://reakit.io/docs/id) and
  [useInput](https://reakit.io/docs/input/)
- SliderThumb uses [useRole](https://reakit.io/docs/role)
- SliderTrack uses [useRole](https://reakit.io/docs/role)

## Props

### `useSliderState`

| Name         | type                  | Description                          |
| :----------- | :-------------------- | :----------------------------------- |
| **`values`** | <code>number[]</code> | The `value` of the slider indicator. |

If `undefined`/`not valid` the slider bar will be the optimum of min & max | |
**`min`** | <code>number</code> | The minimum value of the slider | | **`max`**
| <code>number</code> | The maximum value of the slider | | **`step`** |
<code>number</code> | The step in which increments/decrements have to be made |
| **`isDisabled`** | <code>boolean</code> | If `true`, the slider will be
disabled | | **`orientation`** | <code>&#34;horizontal&#34; \|
&#34;vertical&#34;</code> | Orientation of the slider | | **`reversed`** |
<code>boolean</code> | Direction of the slider | | **`defaultValues`** |
<code>number[] \| undefined</code> | The `defaultValue` of the slider indicator.
| | **`onChange`** | <code>((value: number[]) =&#62; void) \| undefined</code> |
Handler that is called when the value changes. | | **`onChangeEnd`** |
<code>((value: number[]) =&#62; void) \| undefined</code> | Get the value when
dragging is started | | **`onChangeStart`** | <code>((value: number[]) =&#62;
void) \| undefined</code> | Get the value when dragging is stopped | |
**`formatOptions`** | <code>NumberFormatOptions \| undefined</code> | Get the
formated value based on number format options |

### `SliderInput`

| Name            | type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |
| **`baseId`**    | <code>string</code>               | ID that will serve as a base for all the items IDs.                                                                                                          |
| **`id`**        | <code>string \| undefined</code>  | Same as the HTML attribute.                                                                                                                                  |
| **`index`**     | <code>number</code>               |                                                                                                                                                              |

<details><summary>10 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| **`step`** | <code>number</code> | The step in which increments/decrements
have to be made | | **`isDisabled`** | <code>boolean</code> | If `true`, the
slider will be disabled | | **`orientation`** | <code>&#34;horizontal&#34; \|
&#34;vertical&#34;</code> | Orientation of the slider | | **`getThumbMinValue`**
| <code>(index: number) =&#62; number</code> | Returns the min values for the
index | | **`getThumbMaxValue`** | <code>(index: number) =&#62; number</code> |
Returns the max values for the index | | **`getThumbValueLabel`** |
<code>(index: number) =&#62; string</code> | Returns the formatted thumb value
based on it's index | | **`registerInput`** | <code>(item: Item) =&#62;
void</code> | Register the inputs on mount | | **`unregisterInput`** |
<code>(id: string) =&#62; void</code> | Unregister the inputs on mount | |
**`setFocusedThumb`** | <code>(index: number \| undefined) =&#62; void</code> |
Set currently Focused Thumb | | **`setThumbValue`** | <code>(index: number,
value: number) =&#62; void</code> | Sets value for thumb. The actually value set
will be clamped and rounded according to min/max/step |

</details>

### `SliderThumb`

| Name        | type                | Description |
| :---------- | :------------------ | :---------- |
| **`index`** | <code>number</code> |             |

<details><summary>13 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| **`step`** | <code>number</code> | The step in which increments/decrements
have to be made | | **`isDisabled`** | <code>boolean</code> | If `true`, the
slider will be disabled | | **`orientation`** | <code>&#34;horizontal&#34; \|
&#34;vertical&#34;</code> | Orientation of the slider | | **`reversed`** |
<code>boolean</code> | Direction of the slider | | **`trackRef`** |
<code>RefObject&#60;HTMLElement \| null&#62;</code> | The track slider element.
| | **`focusedThumb`** | <code>number \| undefined</code> | Currently focused
thumb | | **`getThumbValue`** | <code>(index: number) =&#62; number</code> | Get
Thumb value based on its index | | **`getThumbPercent`** | <code>(index: number)
=&#62; number</code> | Returns the value offset as a percentage from 0 to 1. | |
**`inputs`** | <code>Item[]</code> | Get all the inputs in the DOM | |
**`setThumbValue`** | <code>(index: number, value: number) =&#62; void</code> |
Sets value for thumb. The actually value set will be clamped and rounded
according to min/max/step | | **`setThumbEditable`** | <code>(index: number,
editable: boolean) =&#62; void</code> | Set true if the thumb registered is
editable | | **`setThumbDragging`** | <code>(index: number, dragging: boolean)
=&#62; void</code> | set dragging true if the thumb registered is being
currently dragged | | **`setThumbPercent`** | <code>(index: number, percent:
number) =&#62; void</code> | Sets value for thumb by percent offset (between 0
and 1) |

</details>

### `SliderTrack`

<details><summary>13 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| **`values`** | <code>number[]</code> | The `value` of the slider indicator.

If `undefined`/`not valid` the slider bar will be the optimum of min & max | |
**`isDisabled`** | <code>boolean</code> | If `true`, the slider will be disabled
| | **`orientation`** | <code>&#34;horizontal&#34; \| &#34;vertical&#34;</code>
| Orientation of the slider | | **`reversed`** | <code>boolean</code> |
Direction of the slider | | **`trackRef`** | <code>RefObject&#60;HTMLElement \|
null&#62;</code> | The track slider element. | | **`getThumbPercent`** |
<code>(index: number) =&#62; number</code> | Returns the value offset as a
percentage from 0 to 1. | | **`getPercentValue`** | <code>(percent: number)
=&#62; number</code> | Converts a percent along track (between 0 and 1) to the
corresponding value | | **`isThumbEditable`** | <code>(index: number) =&#62;
boolean</code> | Get editableThumb based on the index | | **`isThumbDragging`**
| <code>(index: number) =&#62; boolean</code> | Whether a specific index is
being dragged | | **`setFocusedThumb`** | <code>(index: number \| undefined)
=&#62; void</code> | Set currently Focused Thumb | | **`setThumbValue`** |
<code>(index: number, value: number) =&#62; void</code> | Sets value for thumb.
The actually value set will be clamped and rounded according to min/max/step | |
**`setThumbDragging`** | <code>(index: number, dragging: boolean) =&#62;
void</code> | set dragging true if the thumb registered is being currently
dragged | | **`setThumbPercent`** | <code>(index: number, percent: number)
=&#62; void</code> | Sets value for thumb by percent offset (between 0 and 1) |

</details>
