# Slider

`Slider` component is a form element used to select a number by sliding through
the given range with complete freedom of styling. It follows
[WAI-ARIA Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/)
for the
[keyboard navigation](https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/#:~:text=a%20hotel%20reservation.-,Keyboard%20Interaction,-Each%20thumb%20is)
&
[accessibility properties](https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/#:~:text=does%20not%20change.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-Each%20element%20serving).
Support all the features as React Aria's
[useSlider](https://react-spectrum.adobe.com/react-aria/useSlider.html#features).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`SliderOptions`](#slideroptions)
  - [`SliderBaseStateProps`](#sliderbasestateprops)
  - [`SliderInputOptions`](#sliderinputoptions)
  - [`SliderLabelOptions`](#sliderlabeloptions)
  - [`SliderOutputOptions`](#slideroutputoptions)
  - [`SliderStateProps`](#sliderstateprops)
  - [`SliderThumbOptions`](#sliderthumboptions)
  - [`SliderThumbStateProps`](#sliderthumbstateprops)
  - [`SliderTrackOptions`](#slidertrackoptions)

## Usage

```js
import * as React from "react";

import {
  Slider,
  SliderThumb,
  SliderTrack,
  useSliderBaseState,
  useSliderState,
  useSliderThumbState,
} from "@adaptui/react";

export const SliderBasic = props => {
  const { label } = props;
  const sliderLabel = `${label ? label : "Styled"} Slider`;
  const state = useSliderBaseState(props);
  const slider = useSliderState({ ...props, "aria-label": sliderLabel, state });
  const { getValuePercent, values } = state;

  return (
    <Slider className="chakra-slider-group" state={slider}>
      <div className="slider">
        <SliderTrack state={slider} className="slider-track-container">
          <div className="slider-track" />
          <div
            className="slider-filled-track"
            style={{ width: `${getValuePercent(values[0]) * 100}%` }}
          />
        </SliderTrack>

        <Thumb
          index={0}
          state={state}
          orientation={props.orientation}
          isDisabled={props.isDisabled}
          trackRef={slider.trackRef}
          aria-label="Thumb"
        />
      </div>
    </Slider>
  );
};

export default SliderBasic;

export const Thumb = props => {
  const sliderThumb = useSliderThumbState(props);
  const { index } = props;
  const { getThumbPercent, getThumbValueLabel } = props.state;

  return (
    <div
      className="slider-thumb"
      style={{ left: `calc(${getThumbPercent(index) * 100}% - 7px)` }}
    >
      <SliderThumb state={sliderThumb} className="slider-thumb-handle" />
      <div className="slider-thumb-tip">{getThumbValueLabel(index)}</div>
    </div>
  );
};
```

[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/yb6kvp)
[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/96m9vv)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Origin%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/vm9mgc)
[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Origin%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/v3ln5o)

[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Reversed%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/cvyj1t)
[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Reversed%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/sib243)

[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Vertical%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/kiggjt)
[![Edit CodeSandbox](https://img.shields.io/badge/Single%20Vertical%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/4jyfpj)

[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/up0g7f)
[![Edit CodeSandbox](https://img.shields.io/badge/Range%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/6kfxcb)

[![Edit CodeSandbox](https://img.shields.io/badge/Multi%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/769b4h)
[![Edit CodeSandbox](https://img.shields.io/badge/Multi%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/t954cb)

[![Edit CodeSandbox](https://img.shields.io/badge/AllInOne%20Slider-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/1wl8ws)
[![Edit CodeSandbox](https://img.shields.io/badge/AllInOne%20Slider%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/8ogbo5)

## Composition

- Slider uses `Role`
- useSliderBaseState uses `useSliderState`
- SliderInput uses `Role`
- SliderLabel uses `Role`
- SliderOutput uses `Role`
- useSliderState uses its own state
- SliderThumb uses `Role`
- useSliderThumbState uses its own state
- SliderTrack uses `Role`

## Props

### `SliderOptions`

| Name        | Type                     | Description                                   |
| :---------- | :----------------------- | :-------------------------------------------- |
| **`state`** | <code>SliderState</code> | Object returned by the `useSliderState` hook. |

### `SliderBaseStateProps`

| Name                | Type                                          | Description                            |
| :------------------ | :-------------------------------------------- | :------------------------------------- |
| **`formatOptions`** | <code>NumberFormatOptions \| undefined</code> | The display format of the value label. |

<details><summary>SliderStateProps props</summary>
> These props are returned by the other props You can also provide these props.

| Name               | Type                                               | Description                                              |
| :----------------- | :------------------------------------------------- | :------------------------------------------------------- |
| **`orientation`**  | <code>Orientation \| undefined</code>              | The orientation of the Slider.                           |
| **`isDisabled`**   | <code>boolean \| undefined</code>                  | Whether the whole Slider is disabled.                    |
| **`onChangeEnd`**  | <code>((value: T) =&#62; void) \| undefined</code> | Fired when the slider stops moving, due to being let go. |
| **`minValue`**     | <code>number \| undefined</code>                   | The slider's minimum value.                              |
| **`maxValue`**     | <code>number \| undefined</code>                   | The slider's maximum value.                              |
| **`step`**         | <code>number \| undefined</code>                   | The slider's step value.                                 |
| **`value`**        | <code>T \| undefined</code>                        | The current value (controlled).                          |
| **`defaultValue`** | <code>T \| undefined</code>                        | The default value (uncontrolled).                        |
| **`onChange`**     | <code>((value: C) =&#62; void) \| undefined</code> | Handler that is called when the value changes.           |
| **`label`**        | <code>ReactNode</code>                             | The content to display as the label.                     |

</details>

### `SliderInputOptions`

| Name        | Type                          | Description                                   |
| :---------- | :---------------------------- | :-------------------------------------------- |
| **`state`** | <code>SliderThumbState</code> | Object returned by the `useSliderState` hook. |

### `SliderLabelOptions`

| Name        | Type                     | Description                                   |
| :---------- | :----------------------- | :-------------------------------------------- |
| **`state`** | <code>SliderState</code> | Object returned by the `useSliderState` hook. |

### `SliderOutputOptions`

| Name        | Type                     | Description                                   |
| :---------- | :----------------------- | :-------------------------------------------- |
| **`state`** | <code>SliderState</code> | Object returned by the `useSliderState` hook. |

### `SliderStateProps`

| Name                   | Type                             | Description                                                                                                         |
| :--------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **`id`**               | <code>string \| undefined</code> | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| **`aria-label`**       | <code>string \| undefined</code> | Defines a string value that labels the current element.                                                             |
| **`aria-labelledby`**  | <code>string \| undefined</code> | Identifies the element (or elements) that labels the current element.                                               |
| **`aria-describedby`** | <code>string \| undefined</code> | Identifies the element (or elements) that describes the object.                                                     |
| **`aria-details`**     | <code>string \| undefined</code> | Identifies the element (or elements) that provide a detailed, extended description for the object.                  |
| **`state`**            | <code>SliderState</code>         | Object returned by the `useSliderBaseState` hook.                                                                   |

### `SliderThumbOptions`

| Name        | Type                          | Description                                        |
| :---------- | :---------------------------- | :------------------------------------------------- |
| **`state`** | <code>SliderThumbState</code> | Object returned by the `useSliderThumbState` hook. |

### `SliderThumbStateProps`

| Name                      | Type                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`index`**               | <code>number</code>                                                                                                                                       | Index of the thumb for accessing purposes.                                                                                                                                                                                                                                                 |
| **`autoFocus`**           | <code>boolean \| undefined</code>                                                                                                                         | Whether the element should receive focus on render.                                                                                                                                                                                                                                        |
| **`onFocus`**             | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element receives focus.                                                                                                                                                                                                                                    |
| **`onBlur`**              | <code title="((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| undefined">((e: FocusEvent&#60;Element, Element&#62;) =&#62; void) \| u...</code> | Handler that is called when the element loses focus.                                                                                                                                                                                                                                       |
| **`onFocusChange`**       | <code>((isFocused: boolean) =&#62; void) \| undefined</code>                                                                                              | Handler that is called when the element's focus status changes.                                                                                                                                                                                                                            |
| **`onKeyDown`**           | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is pressed.                                                                                                                                                                                                                                              |
| **`onKeyUp`**             | <code>((e: KeyboardEvent) =&#62; void) \| undefined</code>                                                                                                | Handler that is called when a key is released.                                                                                                                                                                                                                                             |
| **`validationState`**     | <code>ValidationState \| undefined</code>                                                                                                                 | Whether the input should display its "valid" or "invalid" visual styling.                                                                                                                                                                                                                  |
| **`isRequired`**          | <code>boolean \| undefined</code>                                                                                                                         | Whether user input is required on the input before form submission.Often paired with the `necessityIndicator` prop to add a visual indicator to the input.                                                                                                                                 |
| **`id`**                  | <code>string \| undefined</code>                                                                                                                          | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).                                                                                                                                                                        |
| **`excludeFromTabOrder`** | <code>boolean \| undefined</code>                                                                                                                         | Whether to exclude the element from the sequential tab order. If true,the element will not be focusable via the keyboard by tabbing. This shouldbe avoided except in rare scenarios where an alternative means of accessingthe element or its functionality via the keyboard is available. |
| **`aria-label`**          | <code>string \| undefined</code>                                                                                                                          | Defines a string value that labels the current element.                                                                                                                                                                                                                                    |
| **`aria-labelledby`**     | <code>string \| undefined</code>                                                                                                                          | Identifies the element (or elements) that labels the current element.                                                                                                                                                                                                                      |
| **`aria-describedby`**    | <code>string \| undefined</code>                                                                                                                          | Identifies the element (or elements) that describes the object.                                                                                                                                                                                                                            |
| **`aria-details`**        | <code>string \| undefined</code>                                                                                                                          | Identifies the element (or elements) that provide a detailed, extended description for the object.                                                                                                                                                                                         |
| **`aria-errormessage`**   | <code>string \| undefined</code>                                                                                                                          | Identifies the element that provides an error message for the object.                                                                                                                                                                                                                      |
| **`trackRef`**            | <code>RefObject&#60;HTMLElement&#62;</code>                                                                                                               | A ref to the track element.                                                                                                                                                                                                                                                                |
| **`state`**               | <code>SliderState</code>                                                                                                                                  | Object returned by the `useSliderBaseState` hook.                                                                                                                                                                                                                                          |

### `SliderTrackOptions`

| Name        | Type                     | Description                                   |
| :---------- | :----------------------- | :-------------------------------------------- |
| **`state`** | <code>SliderState</code> | Object returned by the `useSliderState` hook. |
