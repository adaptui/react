# PickerBase

`PickerBase` component provides easier way to plug them into the
[DatePicker](./datepicker.md) & [TimePicker](./timepicker.md). It follows
[WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#disclosure)

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`usePickerBaseState`](#usepickerbasestate)
  - [`PickerBase`](#pickerbase)
  - [`PickerBaseContent`](#pickerbasecontent)
  - [`PickerBaseTrigger`](#pickerbasetrigger)

## Usage

```js
import * as React from "react";

import {
  PickerBase as RenderlesskitPickerBase,
  PickerBaseTrigger,
  PickerBaseContent,
  usePickerBaseState,
} from "@renderlesskit/react";

export const PickerBase = props => {
  const state = usePickerBaseState(props);

  return (
    <>
      <RenderlesskitPickerBase {...state}>
        <PickerBaseTrigger {...state}>open</PickerBaseTrigger>
      </RenderlesskitPickerBase>
      <PickerBaseContent {...state}>Content</PickerBaseContent>
    </>
  );
};

export default PickerBase;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Picker%20Base-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/yighd)

## Composition

- PickerBase uses [useRole](https://reakit.io/docs/role)
- PickerBaseContent uses [usePopover](https://reakit.io/docs/popover/)
- PickerBaseTrigger uses [usePopoverDisclosure](https://reakit.io/docs/popover/)

## Props

### `usePickerBaseState`

| Name                                                                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`baseId`**                                                        | <code>string</code>                                                                                                                                                                                                                                                                                                                                                                                                                       | ID that will serve as a base for all the items IDs.                                                                                                                                                                                                                   |
| **`visible`**                                                       | <code>boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                                      | Whether it's visible or not.                                                                                                                                                                                                                                          |
| **`animated`**                                                      | <code>number \| boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                            | If `true`, `animating` will be set to `true` when `visible` is updated.It'll wait for `stopAnimation` to be called or a CSS transition ends.If `animated` is set to a `number`, `stopAnimation` will be called onlyafter the same number of milliseconds have passed. |
| **`modal`**                                                         | <code>boolean</code>                                                                                                                                                                                                                                                                                                                                                                                                                      | Toggles Dialog's `modal` state. - Non-modal: `preventBodyScroll` doesn't work and focus is free. - Modal: `preventBodyScroll` is automatically enabled, focus istrapped within the dialog and the dialog is rendered within a `Portal`by default.                     |
| **`placement`**                                                     | <code title="&#34;auto-start&#34; \| &#34;auto&#34; \| &#34;auto-end&#34; \| &#34;top-start&#34; \| &#34;top&#34; \| &#34;top-end&#34; \| &#34;right-start&#34; \| &#34;right&#34; \| &#34;right-end&#34; \| &#34;bottom-end&#34; \| &#34;bottom&#34; \| &#34;bottom-start&#34; \| &#34;left-end&#34; \| &#34;left&#34; \| &#34;left-start&#34;">&#34;auto-start&#34; \| &#34;auto&#34; \| &#34;auto-end&#34; \| &#34;top-start...</code> | Actual `placement`.                                                                                                                                                                                                                                                   |
| **`unstable_fixed`** <span title="Experimental">⚠️</span>           | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether or not the popover should have `position` set to `fixed`.                                                                                                                                                                                                     |
| **`unstable_flip`** <span title="Experimental">⚠️</span>            | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Flip the popover's placement when it starts to overlap its referenceelement.                                                                                                                                                                                          |
| **`unstable_offset`** <span title="Experimental">⚠️</span>          | <code>[string \| number, string \| number] \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                            | Offset between the reference and the popover: [main axis, alt axis]. Should not be combined with `gutter`.                                                                                                                                                            |
| **`gutter`**                                                        | <code>number \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Offset between the reference and the popover on the main axis. Should not be combined with `unstable_offset`.                                                                                                                                                         |
| **`unstable_preventOverflow`** <span title="Experimental">⚠️</span> | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Prevents popover from being positioned outside the boundary.                                                                                                                                                                                                          |
| **`isDisabled`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the input is disabled.                                                                                                                                                                                                                                        |
| **`isReadOnly`**                                                    | <code>boolean \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                         | Whether the input can be selected but not changed by the user.                                                                                                                                                                                                        |
| **`pickerId`**                                                      | <code>string \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Picker wrapper Id                                                                                                                                                                                                                                                     |
| **`dialogId`**                                                      | <code>string \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                          | Dialog Id                                                                                                                                                                                                                                                             |
| **`segmentFocus`**                                                  | <code>(() =&#62; void) \| undefined</code>                                                                                                                                                                                                                                                                                                                                                                                                | Function to be called on picker mousedownfor focusing first tabbable element                                                                                                                                                                                          |

### `PickerBase`

<details><summary>7 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name               | Type                                       | Description                           |
| :----------------- | :----------------------------------------- | :------------------------------------ |
| **`visible`**      | <code>boolean</code>                       | Whether it's visible or not.          |
| **`pickerId`**     | <code>string \| undefined</code>           |                                       |
| **`dialogId`**     | <code>string \| undefined</code>           |                                       |
| **`isDisabled`**   | <code>boolean \| undefined</code>          |                                       |
| **`isReadOnly`**   | <code>boolean \| undefined</code>          |                                       |
| **`segmentFocus`** | <code>(() =&#62; void) \| undefined</code> |                                       |
| **`show`**         | <code>() =&#62; void</code>                | Changes the `visible` state to `true` |

</details>

### `PickerBaseContent`

| Name                                                                | Type                                                     | Description                                                                                                                                                                                                                  |
| :------------------------------------------------------------------ | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`hideOnEsc`**                                                     | <code>boolean \| undefined</code>                        | When enabled, user can hide the dialog by pressing `Escape`.                                                                                                                                                                 |
| **`hideOnClickOutside`**                                            | <code>boolean \| undefined</code>                        | When enabled, user can hide the dialog by clicking outside it.                                                                                                                                                               |
| **`preventBodyScroll`**                                             | <code>boolean \| undefined</code>                        | When enabled, user can't scroll on body when the dialog is visible.This option doesn't work if the dialog isn't modal.                                                                                                       |
| **`unstable_initialFocusRef`** <span title="Experimental">⚠️</span> | <code>RefObject&#60;HTMLElement&#62; \| undefined</code> | The element that will be focused when the dialog shows.When not set, the first tabbable element within the dialog will be used.                                                                                              |
| **`unstable_finalFocusRef`** <span title="Experimental">⚠️</span>   | <code>RefObject&#60;HTMLElement&#62; \| undefined</code> | The element that will be focused when the dialog hides.When not set, the disclosure component will be used.                                                                                                                  |
| **`unstable_orphan`** <span title="Experimental">⚠️</span>          | <code>boolean \| undefined</code>                        | Whether or not the dialog should be a child of its parent.Opening a nested orphan dialog will close its parent dialog if`hideOnClickOutside` is set to `true` on the parent.It will be set to `false` if `modal` is `false`. |

<details><summary>8 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                | Type                             | Description                                                                                                                                                                                                                                                           |
| :------------------ | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`baseId`**        | <code>string</code>              | ID that will serve as a base for all the items IDs.                                                                                                                                                                                                                   |
| **`visible`**       | <code>boolean</code>             | Whether it's visible or not.                                                                                                                                                                                                                                          |
| **`animated`**      | <code>number \| boolean</code>   | If `true`, `animating` will be set to `true` when `visible` is updated.It'll wait for `stopAnimation` to be called or a CSS transition ends.If `animated` is set to a `number`, `stopAnimation` will be called onlyafter the same number of milliseconds have passed. |
| **`animating`**     | <code>boolean</code>             | Whether it's animating or not.                                                                                                                                                                                                                                        |
| **`stopAnimation`** | <code>() =&#62; void</code>      | Stops animation. It's called automatically if there's a CSS transition.                                                                                                                                                                                               |
| **`modal`**         | <code>boolean</code>             | Toggles Dialog's `modal` state. - Non-modal: `preventBodyScroll` doesn't work and focus is free. - Modal: `preventBodyScroll` is automatically enabled, focus istrapped within the dialog and the dialog is rendered within a `Portal`by default.                     |
| **`hide`**          | <code>() =&#62; void</code>      | Changes the `visible` state to `false`                                                                                                                                                                                                                                |
| **`dialogId`**      | <code>string \| undefined</code> |                                                                                                                                                                                                                                                                       |

</details>

### `PickerBaseTrigger`

| Name            | Type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |

<details><summary>6 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                                                             | Type                                                | Description                                         |
| :--------------------------------------------------------------- | :-------------------------------------------------- | :-------------------------------------------------- |
| **`visible`**                                                    | <code>boolean</code>                                | Whether it's visible or not.                        |
| **`baseId`**                                                     | <code>string</code>                                 | ID that will serve as a base for all the items IDs. |
| **`toggle`**                                                     | <code>() =&#62; void</code>                         | Toggles the `visible` state                         |
| **`unstable_referenceRef`** <span title="Experimental">⚠️</span> | <code>RefObject&#60;HTMLElement \| null&#62;</code> | The reference element.                              |
| **`isDisabled`**                                                 | <code>boolean \| undefined</code>                   |                                                     |
| **`isReadOnly`**                                                 | <code>boolean \| undefined</code>                   |                                                     |

</details>
