# Breadcrumb

`Breadcrumb` component is used for the page navigation and it provides the
required aria attributes for it's links. It follows the
[WAI-ARIA Breadcrumb Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#breadcrumb)
for its
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-2).

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)

## Usage

```js
import * as React from "react";

import { BreadcrumbLink, Breadcrumbs } from "@adaptui/react";

export const BreadcrumbsBasic = props => {
  return (
    <Breadcrumbs aria-label="Breadcrumb" className="breadcrumb">
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
            isCurrentPage
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
};

export default BreadcrumbsBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Breadcrumbs-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/4ywvzv)

## Accessibility Requirement

- `Breadcrumbs` should have `aria-label` or `aria-labelledby` attribute.
- `BreadcrumbLink` should have `aria-current` set to `page` if the currenct page
  is loaded.

## Composition

- BreadcrumbLink uses `useCommand`
- Breadcrumbs uses

<!-- INJECT_PROPS src/breadcrumbs -->
