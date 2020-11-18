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

- [Accordion](#accordion)
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

## Accordion

Accessible Accordion component. It follows the
[WAI-ARIA Accordion Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion).

### Usage

```js
import {
  Accordion,
  AccordionPanel,
  AccordionTrigger,
  useAccordionState,
} from "renderless-components";

function Example() {
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
      <h2>
        <AccordionTrigger {...state}>Trigger 3</AccordionTrigger>
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
```

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

## Link

Accessible `Link` component that provides the required aria role when used under
different compositions. It follows the
[WAI-ARIA Link Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#link).

### Usage

```js
import { Link } from "renderless-components";

function Example() {
  return <Link href="#link">Link</Link>;
}
```

### Accessibilty

- `Link` has role `link`.

### Composition

- `Link` uses
  [Clickable](https://github.com/reakit/reakit/blob/master/docs/clickable)

## Breadcrumb

Accessible `Breadcrumb` component that provides the required aria attributes for
it's links. It follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb).

### Usage

```js
import { Breadcrumbs, BreadcrumbLink } from "renderless-components";

function Example() {
  return (
    <Breadcrumbs className="breadcrumb">
      <ol>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/">
            WAI-ARIA Authoring Practices 1.1
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex">
            Design Patterns
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink
            isCurrent
            href="https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb"
          >
            Breadcrumb Pattern
          </BreadcrumbLink>
        </li>
        <li>
          <BreadcrumbLink href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/breadcrumb/index.html">
            Breadcrumb Example
          </BreadcrumbLink>
        </li>
      </ol>
    </Breadcrumbs>
  );
}
```

### Accessibilty

- `Breadcrumbs` should have `aria-label` or `aria-labelledby` attribute.
- `BreadcrumbLink` should have `aria-current` set to `page` if the currenct page
  is loaded.
- `BreadcrumbLink` extends the accessibility features of [Link](#Link).

### Composition

- `BreadcrumbLink` uses [Link](#Link).

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

## License

MIT © [Timeless](https://timeless.co/)
