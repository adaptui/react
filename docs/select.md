# Select

`Select` component follows all the accessibility features of
[WAI-ARIA Combobox Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#listbox-popup-keyboard-interaction)
for the Listbox navigation except that it follows
[WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#disclosure)
for the show/hide.

## Table of Contents

- [Usage](#usage)
- [Props](#props)
  - [`useSelectBaseState`](#useselectbasestate)
  - [`useSelectListState`](#useselectliststate)
  - [`useSelectPopoverState`](#useselectpopoverstate)
  - [`useSelectState`](#useselectstate)
  - [`Select`](#select)
  - [`SelectItem`](#selectitem)
  - [`SelectList`](#selectlist)
  - [`SelectOption`](#selectoption)
  - [`SelectPopover`](#selectpopover)
- [Composition](#composition)

## Usage

```js
import * as React from "react";

import {
  Select,
  SelectOption,
  SelectPopover,
  useSelectState,
} from "@renderlesskit/react";

export const App = props => {
  const select = useSelectState({ gutter: 8, ...props });

  return (
    <>
      <Select className="select" {...select} aria-label="Fruit">
        {select.selectedValue || "Select a fruit"}
      </Select>
      <SelectPopover {...select} aria-label="Fruits">
        <SelectOption {...select} value="Apple" />
        <SelectOption {...select} value="AppleCusturd" />
        <SelectOption {...select} value="Orange" />
        <SelectOption {...select} value="Banana" />
      </SelectPopover>
    </>
  );
};

export default App;
```

[Select - Open On Sandbox](https://codesandbox.io/s/mfpy7)

## Props

### `useSelectBaseState`

- **`values`** <code>string[]</code> Options/values provided.
- **`selectedValue`** <code>string | null</code> Initial value to be selected

### `useSelectListState`

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`rtl`** <code>boolean</code> Determines how `next` and `previous` functions
  will behave. If `rtl` is set to `true`, they will be inverted. This only
  affects the composite widget behavior. You still need to set `dir="rtl"` on
  HTML/CSS.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`loop`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code> On
  one-dimensional composites:

  - `true` loops from the last item to the first item and vice-versa.
  - `horizontal` loops only if `orientation` is `horizontal` or not set.
  - `vertical` loops only if `orientation` is `vertical` or not set.
  - If `currentId` is initially set to `null`, the composite element will be
    focused in between the last and first items.

  On two-dimensional composites:

  - `true` loops from the last row/column item to the first item in the same
    row/column and vice-versa. If it's the last item in the last row, it moves
    to the first item in the first row and vice-versa.
  - `horizontal` loops only from the last row item to the first item in the same
    row.
  - `vertical` loops only from the last column item to the first item in the
    column row.
  - If `currentId` is initially set to `null`, vertical loop will have no effect
    as moving down from the last row or up from the first row will focus the
    composite element.
  - If `wrap` matches the value of `loop`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.

- **`wrap`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>
  **Has effect only on two-dimensional composites**. If enabled, moving to the
  next item from the last one in a row or column will focus the first item in
  the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.
- **`shift`** <code>boolean</code> **Has effect only on two-dimensional
  composites**. If enabled, moving up or down when there's no next item or the
  next item is disabled will shift to the item right before it.
- **`values`** <code>string[]</code> Options/values provided.
- **`selectedValue`** <code>string | null</code> Initial value to be selected

### `useSelectPopoverState`

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`modal`** <code>boolean</code> Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within
    the dialog and the dialog is rendered within a `Portal` by default.
- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34;
  | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code> Actual
  `placement`.
- **`unstable_fixed`** <span title="Experimental">⚠️</span> <code>boolean |
  undefined</code> Whether or not the popover should have `position` set to
  `fixed`.
- **`unstable_flip`** <span title="Experimental">⚠️</span> <code>boolean |
  undefined</code> Flip the popover's placement when it starts to overlap its
  reference element.
- **`unstable_offset`** <span title="Experimental">⚠️</span> <code>[string |
  number, string | number] | undefined</code> Offset between the reference and
  the popover: [main axis, alt axis]. Should not be combined with `gutter`.
- **`gutter`** <code>number | undefined</code> Offset between the reference and
  the popover on the main axis. Should not be combined with `unstable_offset`.
- **`unstable_preventOverflow`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code> Prevents popover from being positioned
  outside the boundary.

### `useSelectState`

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`modal`** <code>boolean</code> Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within
    the dialog and the dialog is rendered within a `Portal` by default.
- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34;
  | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code> Actual
  `placement`.
- **`unstable_fixed`** <span title="Experimental">⚠️</span> <code>boolean |
  undefined</code> Whether or not the popover should have `position` set to
  `fixed`.
- **`unstable_flip`** <span title="Experimental">⚠️</span> <code>boolean |
  undefined</code> Flip the popover's placement when it starts to overlap its
  reference element.
- **`unstable_offset`** <span title="Experimental">⚠️</span> <code>[string |
  number, string | number] | undefined</code> Offset between the reference and
  the popover: [main axis, alt axis]. Should not be combined with `gutter`.
- **`gutter`** <code>number | undefined</code> Offset between the reference and
  the popover on the main axis. Should not be combined with `unstable_offset`.
- **`unstable_preventOverflow`** <span title="Experimental">⚠️</span>
  <code>boolean | undefined</code> Prevents popover from being positioned
  outside the boundary.
- **`rtl`** <code>boolean</code> Determines how `next` and `previous` functions
  will behave. If `rtl` is set to `true`, they will be inverted. This only
  affects the composite widget behavior. You still need to set `dir="rtl"` on
  HTML/CSS.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`loop`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code> On
  one-dimensional composites:

  - `true` loops from the last item to the first item and vice-versa.
  - `horizontal` loops only if `orientation` is `horizontal` or not set.
  - `vertical` loops only if `orientation` is `vertical` or not set.
  - If `currentId` is initially set to `null`, the composite element will be
    focused in between the last and first items.

  On two-dimensional composites:

  - `true` loops from the last row/column item to the first item in the same
    row/column and vice-versa. If it's the last item in the last row, it moves
    to the first item in the first row and vice-versa.
  - `horizontal` loops only from the last row item to the first item in the same
    row.
  - `vertical` loops only from the last column item to the first item in the
    column row.
  - If `currentId` is initially set to `null`, vertical loop will have no effect
    as moving down from the last row or up from the first row will focus the
    composite element.
  - If `wrap` matches the value of `loop`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.

- **`wrap`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>
  **Has effect only on two-dimensional composites**. If enabled, moving to the
  next item from the last one in a row or column will focus the first item in
  the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.
- **`shift`** <code>boolean</code> **Has effect only on two-dimensional
  composites**. If enabled, moving up or down when there's no next item or the
  next item is disabled will shift to the item right before it.
- **`values`** <code>string[]</code> Options/values provided.
- **`selectedValue`** <code>string | null</code> Initial value to be selected

### `Select`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`hideOnEsc`** <code>boolean | undefined</code> When enabled, user can hide
the select popover by pressing `esc` while focusing on the select input.
<details><summary>53 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`toggle`** <code>() =&#62; void</code> Toggles the `visible` state
- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code> The reference element.
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`animating`** <code>boolean</code> Whether it's animating or not.
- **`modal`** <code>boolean</code> Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within
    the dialog and the dialog is rendered within a `Portal` by default.
- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34;
  | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code> Actual
  `placement`.
- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code> If enabled, the composite element will act as an
  [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
  container instead of
  [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
  DOM focus will remain on the composite while its items receive virtual focus.
- **`rtl`** <code>boolean</code> Determines how `next` and `previous` functions
  will behave. If `rtl` is set to `true`, they will be inverted. This only
  affects the composite widget behavior. You still need to set `dir="rtl"` on
  HTML/CSS.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`loop`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code> On
  one-dimensional composites:

  - `true` loops from the last item to the first item and vice-versa.
  - `horizontal` loops only if `orientation` is `horizontal` or not set.
  - `vertical` loops only if `orientation` is `vertical` or not set.
  - If `currentId` is initially set to `null`, the composite element will be
    focused in between the last and first items.

  On two-dimensional composites:

  - `true` loops from the last row/column item to the first item in the same
    row/column and vice-versa. If it's the last item in the last row, it moves
    to the first item in the first row and vice-versa.
  - `horizontal` loops only from the last row item to the first item in the same
    row.
  - `vertical` loops only from the last column item to the first item in the
    column row.
  - If `currentId` is initially set to `null`, vertical loop will have no effect
    as moving down from the last row or up from the first row will focus the
    composite element.
  - If `wrap` matches the value of `loop`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.

- **`wrap`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>
  **Has effect only on two-dimensional composites**. If enabled, moving to the
  next item from the last one in a row or column will focus the first item in
  the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.
- **`shift`** <code>boolean</code> **Has effect only on two-dimensional
  composites**. If enabled, moving up or down when there's no next item or the
  next item is disabled will shift to the item right before it.
- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`menuRole`** <code>&#34;listbox&#34; | &#34;tree&#34; | &#34;grid&#34; |
  &#34;dialog&#34;</code> Indicates the type of the suggestions popup.
- **`items`** <code>Item[]</code> Lists all the select items with their `id`,
  DOM `ref`, `disabled` state, `value` and `groupId` if any. This state is
  automatically updated when `registerItem` and `unregisterItem` are called.
- **`values`** <code>string[]</code> Options/values provided.
- **`valuesById`** <code>{ id: string; value: string; }[]</code> Initial value
  to be selected
- **`selectedValue`** <code>string | null</code> Initial value to be selected
- **`currentValue`** <code>string | undefined</code> Initial value to be
  selected
- **`selectedId`** <code>string | null | undefined</code> Id of the item that is
  currently selected.
- **`setBaseId`** <code>(value: SetStateAction&#60;string&#62;) =&#62;
  void</code> Sets `baseId`.
- **`show`** <code>() =&#62; void</code> Changes the `visible` state to `true`
- **`hide`** <code>() =&#62; void</code> Changes the `visible` state to `false`
- **`setVisible`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `visible`.
- **`setAnimated`** <code>(value: SetStateAction&#60;number | boolean&#62;)
  =&#62; void</code> Sets `animated`.
- **`stopAnimation`** <code>() =&#62; void</code> Stops animation. It's called
  automatically if there's a CSS transition.
- **`setModal`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `modal`.
- **`place`** <code>(value: SetStateAction&#60;Placement&#62;) =&#62;
  void</code> Change the `placement` state.
- **`unregisterItem`** <code>(id: string) =&#62; void</code> Unregisters a
  composite item.
- **`registerGroup`** <code>(group: Group) =&#62; void</code> Registers a
  composite group.
- **`unregisterGroup`** <code>(id: string) =&#62; void</code> Unregisters a
  composite group.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
- **`next`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the next item.
- **`previous`** <code>(unstable_allTheWay?: boolean | undefined) =&#62;
  void</code> Moves focus to the previous item.
- **`up`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item above.
- **`down`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item below.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`sort`** <code>() =&#62; void</code> Sorts the `composite.items` based on
  the items position in the DOM. This is especially useful after modifying the
  composite items order in the DOM. Most of the time, though, you don't need to
  manually call this function as the re-ordering happens automatically.
- **`unstable_setVirtual`** <span title="Experimental">⚠️</span> <code>(value:
  SetStateAction&#60;boolean&#62;) =&#62; void</code> Sets `virtual`.
- **`setRTL`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62; void</code>
  Sets `rtl`.
- **`setOrientation`**
  <code title="(value: SetStateAction&#60;&#34;horizontal&#34; | &#34;vertical&#34; | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;&#34;horizontal&#34; | &#34;vertical...</code> Sets
  `orientation`.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`setLoop`**
  <code title="(value: SetStateAction&#60;boolean | &#34;horizontal&#34; | &#34;vertical&#34;&#62;) =&#62; void">(value:
  SetStateAction&#60;boolean | &#34;horizontal&#34; |...</code> Sets `loop`.
- **`setWrap`**
  <code title="(value: SetStateAction&#60;boolean | &#34;horizontal&#34; | &#34;vertical&#34;&#62;) =&#62; void">(value:
  SetStateAction&#60;boolean | &#34;horizontal&#34; |...</code> Sets `wrap`.
- **`setShift`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `shift`.
- **`reset`** <code>() =&#62; void</code> Resets to initial state.
- **`registerItem`** <code>(item: Item) =&#62; void</code> Registers a select
  item.
- **`setSelectedValue`** <code>(value: SetStateAction&#60;string | null&#62;)
  =&#62; void</code> Sets `values`.

</details>

### `SelectItem`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
- **`value`** <code>string | undefined</code> Item's value that will be used to
fill input value and filter `matches` based on the input value. You can omit
this for items that perform actions other than filling a form. For example,
items may open a dialog.
<details><summary>18 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code> If enabled, the composite element will act as an
  [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
  container instead of
  [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
  DOM focus will remain on the composite while its items receive virtual focus.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`registerItem`** <code>(item: Item) =&#62; void</code> Registers a composite
  item.
- **`unregisterItem`** <code>(id: string) =&#62; void</code> Unregisters a
  composite item.
- **`next`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the next item.
- **`previous`** <code>(unstable_allTheWay?: boolean | undefined) =&#62;
  void</code> Moves focus to the previous item.
- **`up`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item above.
- **`down`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item below.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`hide`** <code>() =&#62; void</code> Changes the `visible` state to `false`
- **`setSelectedValue`** <code>(value: SetStateAction&#60;string | null&#62;)
  =&#62; void</code> Sets `values`.

</details>

### `SelectList`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>13 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code> If enabled, the composite element will act as an
  [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
  container instead of
  [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
  DOM focus will remain on the composite while its items receive virtual focus.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`wrap`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>
  **Has effect only on two-dimensional composites**. If enabled, moving to the
  next item from the last one in a row or column will focus the first item in
  the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.
- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`menuRole`** <code>&#34;listbox&#34; | &#34;tree&#34; | &#34;grid&#34; |
  &#34;dialog&#34;</code> Indicates the type of the suggestions popup.

</details>

### `SelectOption`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
- **`value`** <code>string | undefined</code> Item's value that will be used to
fill input value and filter `matches` based on the input value. You can omit
this for items that perform actions other than filling a form. For example,
items may open a dialog.
<details><summary>18 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code> If enabled, the composite element will act as an
  [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
  container instead of
  [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
  DOM focus will remain on the composite while its items receive virtual focus.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`registerItem`** <code>(item: Item) =&#62; void</code> Registers a composite
  item.
- **`unregisterItem`** <code>(id: string) =&#62; void</code> Unregisters a
  composite item.
- **`next`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the next item.
- **`previous`** <code>(unstable_allTheWay?: boolean | undefined) =&#62;
  void</code> Moves focus to the previous item.
- **`up`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item above.
- **`down`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item below.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`hide`** <code>() =&#62; void</code> Changes the `visible` state to `false`
- **`setSelectedValue`** <code>(value: SetStateAction&#60;string | null&#62;)
  =&#62; void</code> Sets `values`.

</details>

### `SelectPopover`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
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
<details><summary>22 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_virtual`** <span title="Experimental">⚠️</span>
  <code>boolean</code> If enabled, the composite element will act as an
  [aria-activedescendant](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_focus_activedescendant)
  container instead of
  [roving tabindex](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).
  DOM focus will remain on the composite while its items receive virtual focus.
- **`orientation`** <code>&#34;horizontal&#34; | &#34;vertical&#34; |
  undefined</code> Defines the orientation of the composite widget. If the
  composite has a single row or column (one-dimensional), the `orientation`
  value determines which arrow keys can be used to move focus:

  - `undefined`: all arrow keys work.
  - `horizontal`: only left and right arrow keys work.
  - `vertical`: only up and down arrow keys work.

  It doesn't have any effect on two-dimensional composites.

- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`wrap`** <code>boolean | &#34;horizontal&#34; | &#34;vertical&#34;</code>
  **Has effect only on two-dimensional composites**. If enabled, moving to the
  next item from the last one in a row or column will focus the first item in
  the next row or column and vice-versa.
  - `true` wraps between rows and columns.
  - `horizontal` wraps only between rows.
  - `vertical` wraps only between columns.
  - If `loop` matches the value of `wrap`, it'll wrap between the last item in
    the last row or column and the first item in the first row or column and
    vice-versa.
- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`menuRole`** <code>&#34;listbox&#34; | &#34;tree&#34; | &#34;grid&#34; |
  &#34;dialog&#34;</code> Indicates the type of the suggestions popup.
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
- **`values`** <code>string[]</code> Options/values provided.
- **`valuesById`** <code>{ id: string; value: string; }[]</code> Initial value
  to be selected
- **`currentValue`** <code>string | undefined</code> Initial value to be
  selected

</details>

## Composition

- Select uses [usePopoverDisclosure](https://reakit.io/docs/popover/)
- SelectItem uses [useCompositeItem](https://reakit.io/docs/composite)
- SelectList uses [useComposite](https://reakit.io/docs/composite)
- SelectOption uses [useSelectItem](./select.md)
- SelectPopover uses [useSelectList](./select.md) and
  [usePopover](https://reakit.io/docs/popover/)
