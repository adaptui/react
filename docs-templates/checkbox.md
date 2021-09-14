# Checkbox

`Checkbox` component can be used as dual or tri-state toggle button regardless
of the type of the underlying element. It follows the
[WAI-ARIA Checkbox Pattern](https://www.w3.org/TR/wai-aria-practices/#checkbox)
for it's
[accessibility properties](https://w3c.github.io/aria-practices/#wai-aria-roles-states-and-properties-5).
By default, it renders the native `<input type="checkbox">`.

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/checkbox/stories/templates/CheckboxBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Checkbox Basic
js: src/checkbox/stories/templates/CheckboxBasicJsx.ts
-->

## Accessibility Requirement

- Checkbox has role `checkbox`.
- When checked, Checkbox has `aria-checked` set to `true`.
- When not checked, Checkbox has `aria-checked` set to `false`.
- When partially checked, Checkbox has `aria-checked` set to `mixed`.
- When Checkbox is not rendered as a native input checkbox, Checkbox will add
  `role="checkbox"`

<!-- INJECT_COMPOSITION src/checkbox -->

<!-- INJECT_PROPS src/checkbox -->
