# TimePicker

`TimePicker` component provides a way to select a time while giving the freedom
to style. It follows the
[Native Input Time](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)
for the keyboard navigation & accessibility features.

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`TimePicker`](#timepicker)
  - [`TimePickerColumn`](#timepickercolumn)
  - [`TimePickerColumnValue`](#timepickercolumnvalue)
  - [`TimePickerContent`](#timepickercontent)
  - [`TimePickerSegment`](#timepickersegment)
  - [`TimePickerSegmentField`](#timepickersegmentfield)
  - [`TimePickerTrigger`](#timepickertrigger)

## Usage

```js
import React from "react";
import {
  TimePicker,
  TimePickerColumn,
  TimePickerSegment,
  TimePickerTrigger,
  TimePickerContent,
  useTimePickerState,
  TimePickerColumnValue,
  TimePickerSegmentField,
} from "@renderlesskit/react";

const CalendarIcon = () => (
  <svg viewBox="0 0 36 36" focusable="false" aria-hidden="true" role="img">
    <path d="M33 6h-5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H10V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v3H1a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 26H2V8h4v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h14v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h4z"></path>
    <path d="M6 12h4v4H6zM12 12h4v4h-4zM18 12h4v4h-4zM24 12h4v4h-4zM6 18h4v4H6zM12 18h4v4h-4zM18 18h4v4h-4zM24 18h4v4h-4zM6 24h4v4H6zM12 24h4v4h-4zM18 24h4v4h-4zM24 24h4v4h-4z"></path>
  </svg>
);

export const App = props => {
  const state = useTimePickerState(props);

  return (
    <>
      <TimePicker className="timepicker" {...state}>
        <div className="timepicker__header">
          <TimePickerSegmentField {...state} className="timepicker__field">
            {state.segments.map((segment, i) => (
              <TimePickerSegment
                key={i}
                segment={segment}
                className="timepicker__field--item"
                {...state}
              />
            ))}
          </TimePickerSegmentField>
          <TimePickerTrigger className="timepicker__trigger" {...state}>
            <CalendarIcon />
          </TimePickerTrigger>
        </div>
      </TimePicker>
      <TimePickerContent className="timepicker__content" {...state}>
        <TimePickerColumn className="timepicker__column" {...state.hourState}>
          {state.hours.map(n => {
            return (
              <TimePickerColumnValue
                key={n}
                className="timepicker__column--value"
                value={n}
                {...state.hourState}
              >
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn className="timepicker__column" {...state.minuteState}>
          {state.minutes.map((n, i) => {
            return (
              <TimePickerColumnValue
                key={n}
                className="timepicker__column--value"
                value={i}
                {...state.minuteState}
              >
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
        <TimePickerColumn
          className="timepicker__column"
          {...state.meridiesState}
        >
          {state.meridies.map((n, i) => {
            return (
              <TimePickerColumnValue
                key={n}
                className="timepicker__column--value"
                value={i}
                {...state.meridiesState}
              >
                {n}
              </TimePickerColumnValue>
            );
          })}
        </TimePickerColumn>
      </TimePickerContent>
    </>
  );
};

export default App;
```

[TimePicker - Open On Sandbox](https://codesandbox.io/s/jph5c)

## Composition

- TimePicker uses [usePickerBase](./picker-base.md)
- TimePickerColumn uses [useComposite](https://reakit.io/docs/composite)
- TimePickerColumnValue uses [useButton](https://reakit.io/docs/button) and
  [useCompositeItem](https://reakit.io/docs/composite)
- TimePickerContent uses [usePickerBaseContent](./picker-base.md)
- TimePickerSegment uses [useSegment](./segment.md)
- TimePickerSegmentField uses [useSegmentField](./segment.md)
- TimePickerTrigger uses [usePickerBaseTrigger](./picker-base.md)

## Props

### `TimePicker`

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

### `TimePickerColumn`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>13 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

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
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
- **`columnType`** <code>&#34;hour&#34; | &#34;minute&#34; |
  &#34;meridian&#34;</code>

</details>

### `TimePickerColumnValue`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
- **`value`** <code>number</code>

<details><summary>19 state props</summary>
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
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
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
- **`visible`** <code>boolean | undefined</code>

- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
- **`selected`** <code>number</code>

- **`setSelected`** <code>(value: number) =&#62; void</code>

</details>

### `TimePickerContent`

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

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
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

### `TimePickerSegment`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
- **`segment`** <code>DateSegment</code>

- **`isRequired`** <code>boolean | undefined</code>

<details><summary>68 state props</summary>
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
- **`currentId`** <code>string | null | undefined</code> The current focused
  item `id`.
  - `undefined` will automatically focus the first enabled composite item.
  - `null` will focus the base composite element and users will be able to
    navigate out of it using arrow keys.
  - If `currentId` is initially set to `null`, the base composite element itself
    will have focus and users will be able to navigate to it using arrow keys.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
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
- **`fieldValue`** <code>Date</code>

- **`setSegment`** <code>(part: DateTimeFormatPartTypes, v: number) =&#62;
  void</code>

- **`increment`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`decrement`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`incrementPage`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`decrementPage`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`dateFormatter`** <code>DateTimeFormat</code>

- **`confirmPlaceholder`** <code>(part: DateTimeFormatPartTypes) =&#62;
  void</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`setFieldValue`** <code>(value: Date) =&#62; void</code>

- **`segments`** <code>DateSegment[]</code>

- **`setBaseId`** <code>(value: SetStateAction&#60;string&#62;) =&#62;
  void</code> Sets `baseId`.
- **`rtl`** <code>boolean</code> Determines how `next` and `previous` functions
  will behave. If `rtl` is set to `true`, they will be inverted. This only
  affects the composite widget behavior. You still need to set `dir="rtl"` on
  HTML/CSS.
- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
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
- **`registerGroup`** <code>(group: Group) =&#62; void</code> Registers a
  composite group.
- **`unregisterGroup`** <code>(id: string) =&#62; void</code> Unregisters a
  composite group.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
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
- **`setLoop`**
  <code title="(value: SetStateAction&#60;boolean | &#34;horizontal&#34; | &#34;vertical&#34;&#62;) =&#62; void">(value:
  SetStateAction&#60;boolean | &#34;horizontal&#34; |...</code> Sets `loop`.
- **`setWrap`**
  <code title="(value: SetStateAction&#60;boolean | &#34;horizontal&#34; | &#34;vertical&#34;&#62;) =&#62; void">(value:
  SetStateAction&#60;boolean | &#34;horizontal&#34; |...</code> Sets `wrap`.
- **`setShift`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `shift`.
- **`reset`** <code>() =&#62; void</code> Resets to initial state.
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`animating`** <code>boolean</code> Whether it's animating or not.
- **`show`** <code>() =&#62; void</code> Changes the `visible` state to `true`
- **`hide`** <code>() =&#62; void</code> Changes the `visible` state to `false`
- **`toggle`** <code>() =&#62; void</code> Toggles the `visible` state
- **`setVisible`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `visible`.
- **`setAnimated`** <code>(value: SetStateAction&#60;number | boolean&#62;)
  =&#62; void</code> Sets `animated`.
- **`stopAnimation`** <code>() =&#62; void</code> Stops animation. It's called
  automatically if there's a CSS transition.
- **`modal`** <code>boolean</code> Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within
    the dialog and the dialog is rendered within a `Portal` by default.
- **`setModal`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `modal`.
- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code> The reference element.
- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34;
  | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code> Actual
  `placement`.
- **`place`** <code>(value: SetStateAction&#60;Placement&#62;) =&#62;
  void</code> Change the `placement` state.
- **`pickerId`** <code>string | undefined</code>

- **`dialogId`** <code>string | undefined</code>

- **`segmentFocus`** <code>(() =&#62; void) | undefined</code>

- **`time`** <code>Date</code>

- **`hours`** <code>number[]</code>

- **`minutes`** <code>number[]</code>

- **`meridies`** <code>string[]</code>

- **`hourState`**
  <code title="{ baseId: string; unstable_idCountRef: MutableRefObject&#60;number&#62;; setBaseId: Dispatch&#60;SetStateAction&#60;string&#62;&#62;; unstable_virtual: boolean; ... 36 more ...; columnType: ColumnType; }">{
  baseId: string; unstable_idCountRef: MutableR...</code>

- **`minuteState`**
  <code title="{ baseId: string; unstable_idCountRef: MutableRefObject&#60;number&#62;; setBaseId: Dispatch&#60;SetStateAction&#60;string&#62;&#62;; unstable_virtual: boolean; ... 36 more ...; columnType: ColumnType; }">{
  baseId: string; unstable_idCountRef: MutableR...</code>

- **`meridiesState`**
  <code title="{ baseId: string; unstable_idCountRef: MutableRefObject&#60;number&#62;; setBaseId: Dispatch&#60;SetStateAction&#60;string&#62;&#62;; unstable_virtual: boolean; ... 36 more ...; columnType: ColumnType; }">{
  baseId: string; unstable_idCountRef: MutableR...</code>

</details>

### `TimePickerSegmentField`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>12 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

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
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`unstable_moves`** <span title="Experimental">⚠️</span> <code>number</code>
  Stores the number of moves that have been performed by calling `move`, `next`,
  `previous`, `up`, `down`, `first` or `last`.
- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.

</details>

### `TimePickerTrigger`

<details><summary>68 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`pickerId`** <code>string | undefined</code>

- **`dialogId`** <code>string | undefined</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`segmentFocus`** <code>(() =&#62; void) | undefined</code>

- **`show`** <code>() =&#62; void</code> Changes the `visible` state to `true`
- **`fieldValue`** <code>Date</code>

- **`setFieldValue`** <code>(value: Date) =&#62; void</code>

- **`segments`** <code>DateSegment[]</code>

- **`dateFormatter`** <code>DateTimeFormat</code>

- **`increment`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`decrement`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`incrementPage`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`decrementPage`** <code>(part: DateTimeFormatPartTypes) =&#62; void</code>

- **`setSegment`** <code>(part: DateTimeFormatPartTypes, v: number) =&#62;
  void</code>

- **`confirmPlaceholder`** <code>(part: DateTimeFormatPartTypes) =&#62;
  void</code>

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`setBaseId`** <code>(value: SetStateAction&#60;string&#62;) =&#62;
  void</code> Sets `baseId`.
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

- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
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
- **`registerItem`** <code>(item: Item) =&#62; void</code> Registers a composite
  item.
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
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`animating`** <code>boolean</code> Whether it's animating or not.
- **`hide`** <code>() =&#62; void</code> Changes the `visible` state to `false`
- **`toggle`** <code>() =&#62; void</code> Toggles the `visible` state
- **`setVisible`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `visible`.
- **`setAnimated`** <code>(value: SetStateAction&#60;number | boolean&#62;)
  =&#62; void</code> Sets `animated`.
- **`stopAnimation`** <code>() =&#62; void</code> Stops animation. It's called
  automatically if there's a CSS transition.
- **`modal`** <code>boolean</code> Toggles Dialog's `modal` state.
  - Non-modal: `preventBodyScroll` doesn't work and focus is free.
  - Modal: `preventBodyScroll` is automatically enabled, focus is trapped within
    the dialog and the dialog is rendered within a `Portal` by default.
- **`setModal`** <code>(value: SetStateAction&#60;boolean&#62;) =&#62;
  void</code> Sets `modal`.
- **`unstable_referenceRef`** <span title="Experimental">⚠️</span>
  <code>RefObject&#60;HTMLElement | null&#62;</code> The reference element.
- **`placement`**
  <code title="&#34;auto-start&#34; | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start&#34; | &#34;top&#34; | &#34;top-end&#34; | &#34;right-start&#34; | &#34;right&#34; | &#34;right-end&#34; | &#34;bottom-end&#34; | &#34;bottom&#34; | &#34;bottom-start&#34; | &#34;left-end&#34; | &#34;left&#34; | &#34;left-start&#34;">&#34;auto-start&#34;
  | &#34;auto&#34; | &#34;auto-end&#34; | &#34;top-start...</code> Actual
  `placement`.
- **`place`** <code>(value: SetStateAction&#60;Placement&#62;) =&#62;
  void</code> Change the `placement` state.
- **`time`** <code>Date</code>

- **`hours`** <code>number[]</code>

- **`minutes`** <code>number[]</code>

- **`meridies`** <code>string[]</code>

- **`hourState`**
  <code title="{ baseId: string; unstable_idCountRef: MutableRefObject&#60;number&#62;; setBaseId: Dispatch&#60;SetStateAction&#60;string&#62;&#62;; unstable_virtual: boolean; ... 36 more ...; columnType: ColumnType; }">{
  baseId: string; unstable_idCountRef: MutableR...</code>

- **`minuteState`**
  <code title="{ baseId: string; unstable_idCountRef: MutableRefObject&#60;number&#62;; setBaseId: Dispatch&#60;SetStateAction&#60;string&#62;&#62;; unstable_virtual: boolean; ... 36 more ...; columnType: ColumnType; }">{
  baseId: string; unstable_idCountRef: MutableR...</code>

- **`meridiesState`**
  <code title="{ baseId: string; unstable_idCountRef: MutableRefObject&#60;number&#62;; setBaseId: Dispatch&#60;SetStateAction&#60;string&#62;&#62;; unstable_virtual: boolean; ... 36 more ...; columnType: ColumnType; }">{
  baseId: string; unstable_idCountRef: MutableR...</code>

</details>
