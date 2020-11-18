<h1 align="center">Renderless Components</h1>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
  Collection of headless components/hooks that are accessible, composable, customizable from low level to build your own UI & Design System powered by <a href="https://reakit.io/">Reakit</a>
System.
<a href="https://renderless-components.netlify.app/"><strong>Explore all components »</strong></a>
</p>

<p align="center">
  <a href="https://npmjs.org/package/renderless-components"><img alt="NPM version" src="https://img.shields.io/npm/v/renderless-components.svg" /></a>
  <a href="https://npmjs.org/package/renderless-components"><img alt="NPM downloads" src="https://img.shields.io/npm/dm/renderless-components.svg"></a>
  <a href="https://github.com/timelessco/renderless-components/actions"><img alt="Build Status" src="https://github.com/timelessco/renderless-components/workflows/Test/badge.svg?event=push&branch=master" /></a>
  <a href="https://app.netlify.com/sites/renderless-components/deploys"><img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/42b9b82f-b8e7-441e-a6c3-9f301addd7ff/deploy-status" /></a><br/>
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

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://navinmoorthy.me/"><img src="https://avatars0.githubusercontent.com/u/39694575?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Navin Moorthy</b></sub></a><br /><a href="https://github.com/timelessco/renderless-components/commits?author=navin-moorthy" title="Code">💻</a></td>
    <td align="center"><a href="http://anuraghazra.github.io/"><img src="https://avatars3.githubusercontent.com/u/35374649?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anurag Hazra</b></sub></a><br /><a href="https://github.com/timelessco/renderless-components/commits?author=anuraghazra" title="Code">💻</a></td>
    <td align="center"><a href="http://timeless.co/"><img src="https://avatars2.githubusercontent.com/u/6380293?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sandeep Prabhakaran</b></sub></a><br /><a href="#ideas-sandeepprabhakaran" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
