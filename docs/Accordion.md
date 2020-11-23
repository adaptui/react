## Accordion

Accessible Accordion component. It follows the
[WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion).

[Accordion Example Live Demo](https://codesandbox.io/s/9qc1x)

# Props

<!-- Automatically generated -->

### `useAccordionState`

- **`allowMultiple`** <code>false | undefined</code> Allow to open multiple
  accordion items
- **`manual`** <code>boolean</code> Whether the accodion selection should be
  manual.
- **`allowToggle`** <code>boolean</code> Allow to toggle accordion items
- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
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

### `Accordion`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
`disabled`, it may still be `focusable`. It works similarly to `readOnly` on
form elements. In this case, only `aria-disabled` will be set.
<details><summary>12 state props</summary>
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
- **`groups`** <code>Group[]</code> Lists all the composite groups with their
  `id` and DOM `ref`. This state is automatically updated when `registerGroup`
  and `unregisterGroup` are called.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`move`** <code>(id: string | null) =&#62; void</code> Moves focus to a given
  item ID.
- **`setCurrentId`**
  <code title="(value: SetStateAction&#60;string | null | undefined&#62;) =&#62; void">(value:
  SetStateAction&#60;string | null | undefine...</code> Sets `currentId`. This
  is different from `composite.move` as this only updates the `currentId` state
  without moving focus. When the composite widget gets focused by the user, the
  item referred by the `currentId` state will get focus.
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.

</details>

### `AccordionPanel`

- **`accordionId`** <code>string | undefined</code> Accordion's id
- **`visible`** <code>boolean</code> Whether it's visible or not.
- **`animating`** <code>boolean</code> Whether it's animating or not.
- **`animated`** <code>number | boolean</code> If `true`, `animating` will be
  set to `true` when `visible` is updated. It'll wait for `stopAnimation` to be
  called or a CSS transition ends. If `animated` is set to a `number`,
  `stopAnimation` will be called only after the same number of milliseconds have
  passed.
- **`stopAnimation`** <code>() =&#62; void</code> Stops animation. It's called
  automatically if there's a CSS transition.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
<details><summary>8 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`baseId`** <code>string</code> ID that will serve as a base for all the
  items IDs.
- **`allowMultiple`** <code>boolean</code> Allow to open multiple accordion
  items
- **`selectedId`** <code>string | null | undefined</code> The current selected
  accordion's `id`.
- **`selectedIds`** <code>(string | null)[] | undefined</code> The current
  selected accordion's `id`.
- **`items`** <code>Item[]</code> Lists all the composite items with their `id`,
  DOM `ref`, `disabled` state and `groupId` if any. This state is automatically
  updated when `registerItem` and `unregisterItem` are called.
- **`registerPanel`** <code>(item: Item) =&#62; void</code> Registers a
  accordion panel.
- **`unregisterPanel`** <code>(id: string) =&#62; void</code> Unregisters a
  accordion panel.
- **`panels`** <code>Item[]</code> Lists all the panels.

</details>

### `AccordionTrigger`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`id`** <code>string | undefined</code> Same as the HTML attribute.
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
- **`first`** <code>() =&#62; void</code> Moves focus to the first item.
- **`last`** <code>() =&#62; void</code> Moves focus to the last item.
- **`next`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the next item.
- **`previous`** <code>(unstable_allTheWay?: boolean | undefined) =&#62;
  void</code> Moves focus to the previous item.
- **`up`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item above.
- **`down`** <code>(unstable_allTheWay?: boolean | undefined) =&#62; void</code>
  Moves focus to the item below.
- **`manual`** <code>boolean</code> Whether the accodion selection should be
  manual.
- **`allowMultiple`** <code>boolean</code> Allow to open multiple accordion
  items
- **`selectedId`** <code>string | null | undefined</code> The current selected
  accordion's `id`.
- **`allowToggle`** <code>boolean</code> Allow to toggle accordion items
- **`selectedIds`** <code>(string | null)[] | undefined</code> The current
  selected accordion's `id`.
- **`panels`** <code>Item[]</code> Lists all the panels.
- **`select`** <code>(id: string | null) =&#62; void</code> Moves into and
  selects an accordion by its `id`.
- **`unSelect`** <code>(id: string | null) =&#62; void</code> Moves into and
  unSelects an accordion by its `id` if it's already selected.

</details>

### Accessibility

- `Accordion` extends the accessibility features of
  [Composite](https://github.com/reakit/reakit/blob/master/docs/composite/#accessibility).
- `AccordionTrigger` has role `button`.
- `AccordionTrigger` has `aria-controls` referring to its associated
  `AccordionPanel`.
- `AccordionTrigger` has `aria-expanded` set to `true` when it's associated
  `AccordionPanel` is expanded.
- Each `AccordionTrigger` should be wrapped in an element with role `heading`.
- `AccordionTrigger` extends the accessibility features of
  [CompositeItem](https://github.com/reakit/reakit/blob/master/docs/composite/#accessibility).
- `AccordionPanel` has `aria-labelledby` referring to its associated
  `AccordionTrigger`.
- `AccordionPanel` extends the accessibility features of
  [DisclosureContent](https://github.com/reakit/reakit/blob/master/docs/disclosure).

### Composition

- Accordion uses [useComposite](https://reakit.io/docs/composite)
- AccordionPanel uses [unstable_useId](https://reakit.io/docs/id) and
  [useDisclosureContent](https://reakit.io/docs/disclosure)
- AccordionTrigger uses [useButton](https://reakit.io/docs/button) and
  [useCompositeItem](https://reakit.io/docs/composite)

### Example

```js
import * as React from "react";

import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
} from "renderless-components";

export function App(props) {
  const state = useAccordionState(props);

  return (
    <Accordion {...state}>
      <h2>
        <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 1</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 2</AccordionPanel>
      <h2>
        <AccordionTrigger {...state} id="accordion3">
          Trigger 3
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 3</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 4</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 4</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 5</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 5</AccordionPanel>
    </Accordion>
  );
}

export default App;
```