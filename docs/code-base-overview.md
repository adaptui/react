# Codebase Overview

_If you are not interested in renderless-component's codebase you can ignore
this documentation_

Let's get a basic overview of our codebase and how our code is stuctured.

Our codebase consists of few important folders

#### [/src](/src)

This is where we keep all our components in respective subfolders.

#### [/src/[component]/\_\_tests\_\_](/src/accordion/__tests__)

Tests for the specific components

#### [/src/[component]/stories](/src/accordion/stories)

Storybook examples

#### [/docs-templates](/docs-templates)

Template for docs which is used for automatically gene

---

### Generated Content.

We have code and docs generation scripts in our workflow which you should be
aware of for reducing any confusion.

We generate:

- keys for reakit components in [\_\_keys.ts](/src/accordion/__keys.ts) file for
  each component.

  Command: `yarn keys`

- Transpile typescript examples to javascript to provide both examples in
  storybook.

  Command: `yarn generatejs`

- Documentation generation, we auto generate proptypes, composition, and inject
  examples in docs with special scripts.

  Command: `yarn docsgen`

### Docs generation guide

For our component API documentation we auto generate them by parsing the
typescript code and extracting information about them.

We have [docs-templates](/docs-templates) which holds the templates for the
docs.

See example for [accordion](/docs-templates/Accordion.md)

#### Props

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
`INJECT_PROPS` syntax and it will inject the prop types in that place,

#### Composition

Composition docs are auto generated Same as before can use

- Accordion uses [useComposite](https://reakit.io/docs/composite)
- AccordionPanel uses [unstable_useId](https://reakit.io/docs/id) and
  [useDisclosureContent](https://reakit.io/docs/disclosure)
- AccordionTrigger uses [useButton](https://reakit.io/docs/button) and
  [useCompositeItem](https://reakit.io/docs/composite)

#### Examples

For the specified component Example injection
`<!-- IMPORT_EXAMPLE src/accordion/AccordionBasic.jsx -->` will inject the
example code.

#### Sandbox links

And finally Sandbox links are also dynamically generated! We can just add this
yaml like markdown comment and it will replace the comment with dynamic sandbox
link

```md
[Open On CodeSandbox](https://codesandbox.io/s/9qc1x)
```

### NPM Scripts

- `storybook` - opens storybook
- `storybook-build` - builds storybook
- `build` - bundles the library
- `test` - runs tests
- `tsd` - runs tests for typescript type check
- `keys` - generates keys for components
- `docsgen` - generates docs for components
- `generatejs` - transpiles ts examples to js
