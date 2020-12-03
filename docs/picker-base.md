# PickerBase

`PickerBase` component provides easier way to plug them into the
[DatePicker](./datepicker.md) & [TimePicker](./timepicker.md). It follows
[WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#disclosure)

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`PickerBase`](#pickerbase)
  - [`PickerBaseContent`](#pickerbasecontent)
  - [`PickerBaseTrigger`](#pickerbasetrigger)

## Usage

```js
import * as React from "react";

import {
  PickerBase,
  PickerBaseTrigger,
  PickerBaseContent,
  usePickerBaseState,
} from "@renderlesskit/react";

export const App = props => {
  const state = usePickerBaseState(props);

  return (
    <>
      <PickerBase {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </PickerBase>
      <PickerBaseContent {...state}>Content</PickerBaseContent>
    </>
  );
};

export default App;
```

[PickerBase - Open On Sandbox](https://codesandbox.io/s/h7pxf)

## Composition

- PickerBase uses [useRole](https://reakit.io/docs/role)
- PickerBaseContent uses [usePopover](https://reakit.io/docs/popover/)
- PickerBaseTrigger uses [usePopoverDisclosure](https://reakit.io/docs/popover/)

## Props

### `PickerBase`

<details><summary>7 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`pickerId`** <code>string | undefined</code>

- **`dialogId`** <code>string | undefined</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`segmentFocus`** <code>(() =&#62; void) | undefined</code>

- **`show`** <code>() =&#62; void</code> Changes the `visible` state to `true`

</details>

### `PickerBaseContent`

- **`hideOnEsc`** <code>boolean | undefined</code> When enabled, user can hide
  the dialog by pressing `Escape`.
- **`hideOnClickOutside`** <code>boolean | undefined</code> When enabled, user
  can hide the dialog by clicking outside it.
- **`preventBodyScroll`** <code>boolean | undefined</code> When enabled, user
  can't scroll on body when the dialog is visible. This option doesn't work if
  the dialog isn't modal.
- **`unstable_initialFocusRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement&#62; | undefined</code> The element that will
  be focused when the dialog shows. When not set, the first tabbable element
  within the dialog will be used.
- **`unstable_finalFocusRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement&#62; | undefined</code> The element that will
  be focused when the dialog hides. When not set, the disclosure component will
  be used.
- **`unstable_orphan`** <span title="Experimental">⚠️</span> <code>boolean |
undefined</code> Whether or not the dialog should be a child of its parent.
Opening a nested orphan dialog will close its parent dialog if
`hideOnClickOutside` is set to `true` on the parent. It will be set to `false`
if `modal` is `false`.
<details><summary>8 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`animating`** <code>boolean</code> Whether it's animating or not.
- **`stopAnimation`** <code>() =&#62; void</code> Stops animation. It's called
  automatically if there's a CSS transition.
- **`modal`** <code>boolean</code> Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within
    the dialog and the dialog is rendered within a `Portal` by default.
- **`hide`** <code>() =&#62; void</code> Changes the `visible` state to `false`
- **`dialogId`** <code>string | undefined</code>

</details>

### `PickerBaseTrigger`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>6 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`toggle`** <code>() =&#62; void</code> Toggles the `visible` state
- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code> The reference element.
- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

</details>
