# Segment

Accessible `Segment` component.

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`Segment`](#segment)
  - [`SegmentField`](#segmentfield)

## Usage

```js
import React from "react";

import { Segment, SegmentField, useSegmentState } from "renderless-components";

export const App = props => {
  const state = useSegmentState(props);

  return (
    <div>
      <SegmentField {...state} className="segment__field">
        {state.segments.map((segment, i) => (
          <Segment
            key={i}
            segment={segment}
            className="segment__field--item"
            {...state}
          />
        ))}
      </SegmentField>
    </div>
  );
};

export default App;
```

[Segment - Open On Sandbox](https://codesandbox.io/s/rb7uv)

## Composition

- Segment uses [useCompositeItem](https://reakit.io/docs/composite)
- SegmentField uses [useComposite](https://reakit.io/docs/composite)

## Props

### `Segment`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
- **`segment`** <code>DateSegment</code>

- **`isDisabled`** <code>boolean | undefined</code>

- **`isReadOnly`** <code>boolean | undefined</code>

- **`isRequired`** <code>boolean | undefined</code>

<details><summary>23 state props</summary>
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
- **`registerItem`** <code>(item: Item) =&#62; void</code> Registers a composite
  item.
- **`unregisterItem`** <code>(id: string) =&#62; void</code> Unregisters a
  composite item.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
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

</details>

### `SegmentField`

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
