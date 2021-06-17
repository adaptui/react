# Progress

`Progress` component provides a graphical status for tasks that take some amount
of time to load. It follows
[WAI-ARIA Progressbar Pattern](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`useProgressState`](#useprogressstate)
  - [`Progress`](#progress)

## Usage

```js
import * as React from "react";

import { Progress, useProgressState } from "@renderlesskit/react";

export const App = props => {
  const state = useProgressState(props);
  const { value, percent, isIndeterminate } = state;

  return (
    <div className="progress">
      <Progress
        {...state}
        value={value}
        aria-label="progress"
        style={{ width: `${percent}%` }}
        className={`progressbar ${isIndeterminate ? "indeterminate" : ""}`}
      />
    </div>
  );
};

export default App;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/cov1f)

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Linear-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/quyuf)

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Circular-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/t9tf0)

## Accessibility Requirement

- If the `Progress` is describing the loading progress of a particular region of
  a page, you should use `aria-describedby` to point to the status, and set the
  `aria-busy `attribute to `true` on the region until it is finished loading.

## Composition

- Progress uses [useRole](https://reakit.io/docs/role)

## Props

### `useProgressState`

| Name        | Type                        | Description                                                                                       |
| :---------- | :-------------------------- | :------------------------------------------------------------------------------------------------ |
| **`value`** | <code>number \| null</code> | The `value` of the progress indicator.If `null` the progress bar will be in `indeterminate` state |
| **`min`**   | <code>number</code>         | The minimum value of the progress                                                                 |
| **`max`**   | <code>number</code>         | The maximum value of the                                                                          |

### `Progress`

<details><summary>4 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                  | Type                        | Description                                                                                       |
| :-------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------ |
| **`value`**           | <code>number \| null</code> | The `value` of the progress indicator.If `null` the progress bar will be in `indeterminate` state |
| **`min`**             | <code>number</code>         | The minimum value of the progress                                                                 |
| **`max`**             | <code>number</code>         | The maximum value of the                                                                          |
| **`isIndeterminate`** | <code>boolean</code>        | `true` if `value` is `null`                                                                       |

</details>
