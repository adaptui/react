# Breadcrumb

`Breadcrumb` component is used for the page navigation and it provides the
required aria attributes for it's links. It follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb)
for its
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-2).

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/breadcrumbs/stories/templates/BreadcrumbsBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Breadcrumbs
js: src/breadcrumbs/stories/templates/BreadcrumbsBasicJsx.ts
css: src/breadcrumbs/stories/templates/BreadcrumbsBasicCss.ts
-->

## Accessibility Requirement

- `Breadcrumbs` should have `aria-label` or `aria-labelledby` attribute.
- `BreadcrumbLink` should have `aria-current` set to `page` if the currenct page
  is loaded.

<!-- INJECT_COMPOSITION src/breadcrumbs -->

<!-- INJECT_PROPS src/breadcrumbs -->
