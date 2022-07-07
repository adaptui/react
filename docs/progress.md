# Progress

`Progress` component provides a graphical status for tasks that take some amount
of time to load. It follows
[WAI-ARIA Progressbar Pattern](https://www.w3.org/TR/wai-aria-1.2/#progressbar)

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)

## Usage

```js
import * as React from "react";

import { Progress, useProgressState } from "@adaptui/react";

export const ProgressBasic = props => {
  const state = useProgressState(props);
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

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/87ch5d)

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Linear-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/4kirlc)

[![Edit CodeSandbox](https://img.shields.io/badge/Progress%20Circular-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/tmfq0l)

## Accessibility Requirement

- If the `Progress` is describing the loading progress of a particular region of
  a page, you should use `aria-describedby` to point to the status, and set the
  `aria-busy `attribute to `true` on the region until it is finished loading.

## Composition

- Progress uses

<!-- INJECT_PROPS src/progress -->
