---
example: src/accordion/stories/__js/AccordionBasic.component.jsx
codesandbox:
  {
    link_title: Accordion Styled Example Live Demo,
    js: "src/accordion/stories/__js/AccordionStyled.component.jsx",
    css: "src/accordion/stories/AccordionStyled.css",
  }
codesandbox1:
  {
    link_title: Accordion Basic Example Live Demo,
    js: "src/accordion/stories/__js/AccordionBasic.component.jsx",
  }
---

## Accordion

Accessible Accordion component. It follows the
[WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion).

<!-- INJECT_CODESANDBOX -->

<!-- INJECT_CODESANDBOX 1 -->

## Props

<!-- INJECT_PROPS -->

## Accessibility

- `Accordion` extends the accessibility features of
  [Composite](https://github.com/reakit/reakit/blob/master/docs/composite/#accessibility).
- `AccordionTrigger` has role `button`.
- `AccordionTrigger` has `aria-controls` referring to its associated
  `AccordionPanel`.
- `AccordionTrigger` has `aria-expanded` set to `true` when it's associated
  `AccordionPanel` is expanded.
- Each `AccordionTrigger` should be wrapped in an element with role `heading`.
- `AccordionTrigger` extends the accessibility features of
  [CompositeItem](https://github.com/reakit/reakit/blob/master/docs/composite/#accessibility).
- `AccordionPanel` has `aria-labelledby` referring to its associated
  `AccordionTrigger`.
- `AccordionPanel` extends the accessibility features of
  [DisclosureContent](https://github.com/reakit/reakit/blob/master/docs/disclosure).

## Composition

<!-- INJECT_COMPOSITION -->

## Example

<!-- IMPORT_EXAMPLE -->
