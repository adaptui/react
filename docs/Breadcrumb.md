## Breadcrumb

Accessible `Breadcrumb` component that provides the required aria attributes for
it's links. It follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb).

# Props

<!-- Automatically generated -->

### `BreadcrumbLink`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`isExternal`** <code>boolean | undefined</code> Opens the link in a new tab
- **`isCurrent`** <code>boolean | undefined</code> If true, sets
  `aria-current: "page"`

### `Breadcrumbs`

No props to show

### Accessibilty

- `Breadcrumbs` should have `aria-label` or `aria-labelledby` attribute.
- `BreadcrumbLink` should have `aria-current` set to `page` if the currenct page
  is loaded.
- `BreadcrumbLink` extends the accessibility features of [Link](#Link).

### Composition

- `BreadcrumbLink` uses [Link](#Link).

### Example

```js

<!-- IMPORT_EXAMPLE src/breadcrumbs/stories/__js/Breadcrumbs.component.jsx -->

```
