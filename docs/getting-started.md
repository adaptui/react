# Getting Started

Collection of headless components/hooks that are accessible, composable,
customizable from low level to build your own UI & Design System powered by
[Ariakit System](https://reakit.io)

## :rocket: Installation

### npm
```sh
npm install @adaptui/react reakit
```

### Yarn
```sh
yarn add @adaptui/react reakit
```

> Make sure `react react-dom` is installed.

## Usage

Code below will render an [Accordion](./Accordion.md)

See [Accordion](./Accordion.md) docs for more info.


```jsx
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
    </Accordion>
  );
};

export default AccordionBasic;
```

## Component Docs

- [Accordion](./accordion.md)
- [Breadcrumbs](./breadcrumb.md)
- [Calendar](./calendar.md)
- [RangeCalendar](./range-calendar.md)
- [DateField](./datefield.md)
- [DatePicker](./datepicker.md)
- [DateRangePicker](./daterange-picker.md)
- [TimeField](./timefield.md)
- [Drawer](./drawer.md)
- [Disclosure](./disclosure.md)
- [Link](./link.md)
- [Meter](./meter.md)
- [Number field](./numberfield.md)
- [Pagination](./pagination.md)
- [Progress](./progress.md)
- [Slider](./slider.md)
- [Toast](./toast.md)


<p align="right">
<a href="./core-principles.md">Next | Core Principles →</a>
</p>
