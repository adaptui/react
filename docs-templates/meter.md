# Meter

`Meter` component can be used to provide a graphical display of a numeric value
that varies within a defined range. It follows the
[WAI-ARIA Meter Pattern](https://w3c.github.io/aria-practices/#meter) for it's
[accessibility properties](https://w3c.github.io/aria-practices/#wai-aria-roles-states-and-properties-15)

<!-- ADD_TOC -->

## Usage

<!-- ADD_EXAMPLE src/meter/stories/templates/MeterBasicJsx.ts -->

<!-- CODESANDBOX
link_title: Meter Basic
js: src/meter/stories/templates/MeterBasicJsx.ts
css: src/meter/stories/templates/MeterBasicCss.ts
-->

<!-- CODESANDBOX
link_title: Meter Styled
js: src/meter/stories/templates/MeterStyledJsx.ts
deps: ['@emotion/css']
-->

## Accessibility Requirement

- `Meter` should have `aria-label` or `aria-labelledby` attribute.
- `Meter` should not be used to represent a value like the current world
  population since it does not have a meaningful maximum limit.
- `Meter` should not be used to indicate progress, such as loading or percent
  completion of a task. To communicate progress, use the progressbar role
  instead.

<!-- ADD_COMPOSITION src/meter -->

<!-- ADD_PROPS src/meter -->
