# NumberField

`NumberField` component is a form element used to select a number while
following the keyboard interactions & accessibility properties like the
[Native Number Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
It follows
[WAI-ARIA Spin Button Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton)
for the accessibility features.

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/numberfield/stories/templates/NumberFieldBasicJsx.ts -->

<!-- CODESANDBOX
link_title: NumberField
js: src/numberfield/stories/templates/NumberFieldBasicJsx.ts
-->

## Accessibility Requirement

- `NumberField` should have `aria-label` or `aria-labelledby` attribute.

<!-- INJECT_COMPOSITION src/numberfield -->

<!-- INJECT_PROPS src/numberfield -->