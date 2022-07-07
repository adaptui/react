# Meter

`Meter` component can be used to provide a graphical display of a numeric value
that varies within a defined range. It follows the
[WAI-ARIA Meter Pattern](https://w3c.github.io/aria-practices/#meter) for it's
[accessibility properties](https://w3c.github.io/aria-practices/#wai-aria-roles-states-and-properties-15)

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)

## Usage

```js
import * as React from "react";

import { Meter, useMeterState } from "@adaptui/react";

export const MeterBasic = props => {
  const state = useMeterState(props);
  const { percent, status } = state;

  return (
    <div className="meter">
      <Meter
        aria-label="meter"
        className="meterbar"
        style={{
          width: `${percent}%`,
          backgroundColor: status == null ? undefined : background[status],
        }}
        state={state}
      ></Meter>
    </div>
  );
};

export default MeterBasic;

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};
```

[![Edit CodeSandbox](https://img.shields.io/badge/Meter%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/nyddy6)

[![Edit CodeSandbox](https://img.shields.io/badge/Meter%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/2yqk5o)

## Accessibility Requirement

- `Meter` should have `aria-label` or `aria-labelledby` attribute.
- `Meter` should not be used to represent a value like the current world
  population since it does not have a meaningful maximum limit.
- `Meter` should not be used to indicate progress, such as loading or percent
  completion of a task. To communicate progress, use the progressbar role
  instead.

## Composition

- Meter uses

<!-- INJECT_PROPS src/meter -->
