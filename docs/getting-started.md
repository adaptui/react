# Getting Started

Collection of headless components/hooks that are accessible, composable,
customizable from low level to build your own UI & Design System powered by
[Reakit](https://reakit.io)

## :rocket: Installation

```sh
# npm
npm install renderless-components reakit

# Yarn
yarn add renderless-components reakit
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
} from "renderless-components";

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

- [Accordion](./docs/Accordion.md)
- [Breadcrumbs](./docs/Breadcrumb.md)
- [Calendar](./docs/Calendar.md)
- Date Picker
- Drawer
- [Link](./docs/Link.md)
- Meter
- Number Input
- Pagination
- Progress
- Select
- Slider
- Time Picker
- Toast

<p align="right">
<a href="./core-principles.md">Next | Core Principles →</a>
</p>
