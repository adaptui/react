# Radio

`Radio` component follows the
[WAI-ARIA Radio Pattern](https://w3c.github.io/aria-practices/#radiobutton) for
it's
[accessibility properties](https://w3c.github.io/aria-practices/#wai-aria-roles-states-and-properties-16).
By default, it renders the native `<input type="radio">`.

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/radio/stories/templates/RadioBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Radio Basic
js: src/radio/stories/templates/RadioBasicJsx.ts
-->

## Accessibility Requirement

- Radio has role `radio`.
- Radio has aria-checked set to true when it's checked. Otherwise, aria-checked
  is set to false.
- Radio extends the accessibility features of CompositeItem, which means it uses
  the roving tabindex method to manage focus.
- When Radio is not rendered as a native input checkbox, Radio will add
  `role="radio"`
- RadioGroup has role `radiogroup`.
- RadioGroup must has `aria-label` or `aria-labelledby` to describe the group.

<!-- INJECT_COMPOSITION src/radio -->

<!-- INJECT_PROPS src/radio -->
