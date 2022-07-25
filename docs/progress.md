# Progress

`Progress` component provides a graphical status for tasks that take some amount
of time to load. It follows
[WAI-ARIA Progressbar Pattern](https://www.w3.org/TR/wai-aria-1.2/#progressbar).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`ProgressOptions`](#progressoptions)
  - [`ProgressStateProps`](#progressstateprops)

## Usage

```js
import * as React from "react";

import { Progress, useProgressState } from "@adaptui/react";

export const ProgressBasic = props => {
  const state = useProgressState({ value: 50, ...props });
  const { percent, isIndeterminate } = state;

  return (
    <div className="progress">
      <Progress
        state={state}
        aria-label="progress"
        style={{ width: `${percent}%` }}
        className={`progressbar ${isIndeterminate ? "indeterminate" : ""}`}
      />
    </div>
  );
};

export default ProgressBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/xb19k8)
[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Basic%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/u2hgx9)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Linear-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/im9w70)
[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Linear%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ol28so)

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Circular-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/y8y3zv)
[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Circular%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/cug271)

## Accessibility Requirement

- If the `Progress` is describing the loading progress of a particular region of
  a page, you should use `aria-describedby` to point to the status, and set the
  `aria-busy `attribute to `true` on the region until it is finished loading.

## Composition

- Progress uses `Role`
- useProgressState uses its own state

## Props

### `ProgressOptions`

| Name        | Type                       | Description                                     |
| :---------- | :------------------------- | :---------------------------------------------- |
| **`state`** | <code>ProgressState</code> | Object returned by the `useProgressState` hook. |

### `ProgressStateProps`

| Name        | Type                        | Description                                                                                       |
| :---------- | :-------------------------- | :------------------------------------------------------------------------------------------------ |
| **`value`** | <code>number \| null</code> | The `value` of the progress indicator.If `null` the progress bar will be in `indeterminate` state |
| **`min`**   | <code>number</code>         | The minimum value of the progress                                                                 |
| **`max`**   | <code>number</code>         | The maximum value of the                                                                          |
