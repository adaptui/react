# Accordion

`Accordion` component expands/collapses to show more information on clicking the
trigger button. It follows the
[WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion)
for
[keyboard interaction](https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction)
&
[accessibiltiy properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties).

<!-- INJECT_TOC -->

## Usage

<!-- IMPORT_EXAMPLE src/accordion/stories/__js/AccordionBasic.component.jsx -->

<!-- CODESANDBOX
link_title: Accordion Basic - Open on Sandbox
js: src/accordion/stories/__js/AccordionBasic.component.jsx
-->

<!-- CODESANDBOX
link_title: Accordion Styled - Open on Sandbox
js: src/accordion/stories/__js/AccordionStyled.component.jsx
css: src/accordion/stories/AccordionStyled.css
-->

## Accessibility Requirements

- Each `AccordionTrigger` should be wrapped in an element with role `heading`
  with proper aria-level.

<!-- INJECT_COMPOSITION src/accordion -->

<!-- INJECT_PROPS src/accordion -->
