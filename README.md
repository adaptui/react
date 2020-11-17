<h1 align="center">Renderless Components</h1>

<p align="center">
  Collection of no-ui components/hooks that are accessible, composable, customizable from low level to build your own UI & Design System powered by <a href="https://reakit.io/">Reakit</a>
System.
<a href="https://renderless-components.netlify.app/"><strong>Explore all components »</strong></a>
</p>

<p align="center">
  <a href="https://npmjs.org/package/renderless-components"><img alt="NPM version" src="https://img.shields.io/npm/v/renderless-components.svg" /></a>
  <a href="https://npmjs.org/package/renderless-components"><img alt="NPM downloads" src="https://img.shields.io/npm/dm/renderless-components.svg"></a>
  <a href="https://github.com/timelessco/renderless-components/actions"><img alt="Build Status" src="https://github.com/timelessco/renderless-components/workflows/Test/badge.svg?event=push&branch=master" /></a>
  <a href="https://app.netlify.com/sites/renderless-components/deploys"><img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/42b9b82f-b8e7-441e-a6c3-9f301addd7ff/deploy-status" /></a><br/>
  <a href="https://codecov.io/gh/timelessco/renderless-components"><img src="https://codecov.io/gh/timelessco/renderless-components/branch/master/graph/badge.svg" /></a>
  <a href="https://github.com/timelessco/renderless-components/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"></a>
</p>

## Features

- Easy to compose
- WAI-ARIA compatible
- Keyboard accessible
- Single HTML tag components
- React Hooks everywhere
- Easy to style using any framework

## Installation

```sh
# npm
npm install renderless-components reakit

# Yarn
yarn add renderless-components reakit
```

> Make sure `react react-dom` is installed.

## Usage

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
      <AccordionPanel {...state}>Panel 1</AccordionPanel>
      <h2>
        <AccordionTrigger {...state}>Trigger 2</AccordionTrigger>
      </h2>
      <AccordionPanel {...state}>Panel 2</AccordionPanel>
    </Accordion>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

Play with this on
[CodeSandbox](https://codesandbox.io/s/renderless-accordion-seywy) and read the
below documentation to learn more.

## Components

- Accordion
- Breadcrumbs
- Calendar
- Date Picker
- Drawer
- Link
- Meter
- Number Input
- Pagination
- Progress
- Select
- Slider
- Time Picker
- Toast

## License

MIT © [Timeless](https://timeless.co/)
