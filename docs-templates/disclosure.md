# Disclosure

Accessible Disclosure component that controls visibility of a section of
content.. It follows the
[WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure)
for it's
[accessibility properties](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-8).

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/disclosure/stories/templates/DisclosureBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Disclosure Basic
js: src/disclosure/stories/templates/DisclosureBasicJsx.ts
-->

## Accessibility Requirement

- `DisclosureButton` extends the accessibility features of
  [Button](https://www.w3.org/TR/wai-aria-practices/#button).
- `DisclosureButton` has a value specified for `aria-controls `that refers to
  `DisclosureContent`.
- When `DisclosureContent` is visible, `DisclosureButton` is `aria-expanded` set
  to `true`.
- When `DisclosureContent` is hidden, `DisclosureButton` is set to `false`.

<!-- INJECT_COMPOSITION src/disclosure -->

<!-- INJECT_PROPS src/disclosure -->
