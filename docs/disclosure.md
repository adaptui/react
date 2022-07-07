# Disclosure

Disclosure component that controls visibility of a section of content.. It
follows the
[WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure)
for it's
[accessibility properties](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-8).

## Table of Contents

- [Usage](#usage)
  - [Horizontal Disclosure](#horizontal-disclosure)
  - [Vertical Disclosure](#vertical-disclosure)

## Usage

### Horizontal Disclosure

```js
import * as React from "react";
import { Disclosure, useDisclosureState } from "ariakit";

import { DisclosureCollapsibleContent } from "@adaptui/react";

export const DisclosureHorizontalCollapseBasic = props => {
  const state = useDisclosureState(props);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Disclosure state={state}>Show More</Disclosure>
      <DisclosureCollapsibleContent
        style={{
          display: "flex",
          flexDirection: "row",
        }}
        direction="horizontal"
        state={state}
      >
        <span style={{ flexShrink: 0 }}>Item 1</span>
        <span style={{ flexShrink: 0 }}>Item 2</span>
        <span style={{ flexShrink: 0 }}>Item 3</span>
        <span style={{ flexShrink: 0 }}>Item 4</span>
        <span style={{ flexShrink: 0 }}>Item 5</span>
        <span style={{ flexShrink: 0 }}>Item 6</span>
      </DisclosureCollapsibleContent>
    </div>
  );
};

export default DisclosureHorizontalCollapseBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Horizontal-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/mu0trp)

### Vertical Disclosure

```js
import * as React from "react";
import { Disclosure, useDisclosureState } from "ariakit";

import { DisclosureCollapsibleContent } from "@adaptui/react";

export const DisclosureVerticalCollapseBasic = props => {
  const state = useDisclosureState(props);

  return (
    <div>
      <Disclosure state={state}>Show More</Disclosure>
      <DisclosureCollapsibleContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        direction="vertical"
        state={state}
      >
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
        <span>Item 6</span>
      </DisclosureCollapsibleContent>
    </div>
  );
};

export default DisclosureVerticalCollapseBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Vertical-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/du4b0c)

## Composition

- DisclosureCollapsibleContent uses

<!-- INJECT_PROPS src/disclosure -->
