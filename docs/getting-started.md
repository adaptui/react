# Getting Started

Collection of headless components/hooks that are accessible, composable,
customizable from low level to build your own UI & Design System powered by
[Reakit](https://reakit.io)

## :rocket: Installation

```sh
# npm
npm install @renderlesskit/react reakit

# Yarn
yarn add @renderlesskit/react reakit
```

> Make sure `react react-dom` is installed.

## Usage

Code below will render an [Accordion](./Accordion.md)

Play with this on
[CodeSandbox](https://codesandbox.io/s/renderless-accordion-seywy)

See [Accordion](./Accordion.md) docs for more info.

```jsx
import React from "react";
import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
} from "@renderlesskit/react";

function App() {
  const state = useAccordionState();

  return (
    <Accordion {...state}>
      <h2>
        <AccordionTrigger {...state}>Trigger 1</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>This is panel 1</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>This is panel 2</AccordionPanel>
    </Accordion>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Component Docs

- [Accordion](accordion.md)
- [Breadcrumbs](breadcrumb.md)
- [Calendar](calendar.md)
- [Date Picker](datepicker.md)
- [Drawer](drawer.md)
- [Link](Link.md)
- [Meter](meter.md)
- [Number Input](number-input.md)
- [Pagination](pagination.md)
- [Picker Base](picker-base.md)
- [Progress](progress.md)
- [Segment](segment.md)
- [Select](select.md)
- [Slider](slider.md)
- [Time Picker](timepicker.md)
- [Toast](toast.md)

<p align="right">
<a href="./core-principles.md">Next | Core Principles →</a>
</p>
