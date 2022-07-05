# Accordion

`Accordion` component expands/collapses to show more information on clicking the
trigger button. It follows the
[WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion)
for
[keyboard interaction](https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction)
&
[accessibiltiy properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties).

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirements](#accessibility-requirements)

## Usage

```js
import * as React from "react";

import {
  Accordion,
  AccordionDisclosure,
  AccordionPanel,
  useAccordionState,
} from "@adaptui/react";

export const AccordionBasic = props => {
  const state = useAccordionState(props);

  return (
    <Accordion state={state}>
      <h2>
        <AccordionDisclosure id="Trigger 1">Trigger 1</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 1">Panel 1</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 2">Trigger 2</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 2">Panel 2</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 3">Trigger 3</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 3">Panel 3</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 4">Trigger 4</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 4">Panel 4</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 5">Trigger 5</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 5">Panel 5</AccordionPanel>
      <h2>
        <AccordionDisclosure id="Trigger 6">Trigger 6</AccordionDisclosure>
      </h2>
      <AccordionPanel id="Panel 6">Panel 6</AccordionPanel>
    </Accordion>
  );
};

export default AccordionBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Accordion-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/1fyn3r)

[![Edit CodeSandbox](https://img.shields.io/badge/Accordion%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/69zwig)

## Accessibility Requirements

- Each `AccordionTrigger` should be wrapped in an element with role `heading`
  with proper aria-level.

## Composition

- Accordion uses `useComposite`
- AccordionDisclosure uses `useCompositeItem`
- AccordionPanel uses `useFocusable`, `useCollectionItem`, and
  `useDisclosureContent`

<!-- INJECT_PROPS src/accordion -->
