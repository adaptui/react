# Disclosure

`Disclosure` component that controls visibility of a section of content. It
follows the
[WAI-ARIA Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
for it's
[keyboard interaction](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/#:~:text=Top%2DLevel%20Links-,Keyboard%20Interaction,-When%20the%20disclosure)
&
[accessibility properties](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/#:~:text=the%20disclosure%20content.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-The%20element%20that).

## Table of Contents

- [Usage](#usage)
  - [Horizontal Disclosure](#horizontal-disclosure)
  - [Vertical Disclosure](#vertical-disclosure)
- [Composition](#composition)
- [Props](#props)
  - [`DisclosureCollapsibleContentOptions`](#disclosurecollapsiblecontentoptions)

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

[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Horizontal-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/0lgike)
[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Horizontal-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/nfnhi9)

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

[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Vertical-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ldlicp)
[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Vertical-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/zz5rwq)

## Composition

- DisclosureCollapsibleContent uses `Role`

## Props

### `DisclosureCollapsibleContentOptions`

| Name                  | Type                                                                 | Description                                                                                   |
| :-------------------- | :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **`state`**           | <code>DisclosureState</code>                                         | Object returned by the `useDisclosureState` hook.                                             |
| **`direction`**       | <code>&#34;vertical&#34; \| &#34;horizontal&#34; \| undefined</code> | Direction of the transition.                                                                  |
| **`contentSize`**     | <code>number \| undefined</code>                                     | Size of the content.                                                                          |
| **`easing`**          | <code>string \| undefined</code>                                     | Transition Easing.                                                                            |
| **`duration`**        | <code>number \| undefined</code>                                     | Duration of the transition.By default the duration is calculated based on the size of change. |
| **`onExpandStart`**   | <code>(() =&#62; void) \| undefined</code>                           | Callback called before the expand transition starts.                                          |
| **`onExpandEnd`**     | <code>(() =&#62; void) \| undefined</code>                           | Callback called after the expand transition ends.                                             |
| **`onCollapseStart`** | <code>(() =&#62; void) \| undefined</code>                           | Callback called before the collapse transition starts.                                        |
| **`onCollapseEnd`**   | <code>(() =&#62; void) \| undefined</code>                           | Callback called after the collapse transition ends..                                          |
