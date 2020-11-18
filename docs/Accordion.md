## Accordion

Accessible Accordion component. It follows the
[WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion).

### Accessibility

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

### Composition

- `Accordion` uses
  [Composite](https://github.com/reakit/reakit/blob/master/docs/composite).
- `AccordionTrigger` uses
  [CompositeItem](https://github.com/reakit/reakit/blob/master/docs/composite).
- `AccordionPanel` uses
  [DisclosureContent](https://github.com/reakit/reakit/blob/master/docs/disclosure).

### Example

```js
import * as React from "react";

import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
} from "renderless-components";

export function App(props) {
  const state = useAccordionState(props);

  return (
    <Accordion {...state}>
      <h2>
        <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 1</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 2</AccordionPanel>
      <h2>
        <AccordionTrigger {...state} id="accordion3">
          Trigger 3
        </AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 3</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 4</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 4</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 5</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 5</AccordionPanel>
    </Accordion>
  );
}

export default App;
```
