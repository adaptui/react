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

<!-- IMPORT_EXAMPLE src/accordion/stories/templates/AccordionBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Accordion
js: src/accordion/stories/templates/AccordionBasicJsx.ts
-->

<!-- CODESANDBOX
link_title: Accordion Styled
js: src/accordion/stories/templates/AccordionStyledJsx.ts
css: src/accordion/stories/templates/AccordionStyledCss.ts
-->

## Accessibility Requirements

- Each `AccordionTrigger` should be wrapped in an element with role `heading`
  with proper aria-level.

<!-- INJECT_COMPOSITION src/accordion -->

<!-- INJECT_PROPS src/accordion -->
