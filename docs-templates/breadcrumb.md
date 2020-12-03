# Breadcrumb

`Breadcrumb` component provides the required aria attributes for it's links. It
follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb)
for its
[accessibility features](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-2).

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/breadcrumbs/stories/__js/Breadcrumbs.component.jsx -->

<!-- CODESANDBOX
link_title: Breadcrumbs Basic - Open on Sandbox
js: src/breadcrumbs/stories/__js/Breadcrumbs.component.jsx
css: src/breadcrumbs/stories/Breadcrumbs.css
-->

## Accessibilty

- `Breadcrumbs` should have `aria-label` or `aria-labelledby` attribute.
- `BreadcrumbLink` should have `aria-current` set to `page` if the currenct page
  is loaded.

<!-- INJECT_COMPOSITION src/breadcrumbs -->

<!-- INJECT_PROPS src/breadcrumbs -->
