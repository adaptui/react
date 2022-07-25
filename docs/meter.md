# Meter

`Meter` component can be used to provide a graphical display of a numeric value
that varies within a defined range. It follows the
[WAI-ARIA Meter Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) for
it's
[accessibility properties](https://www.w3.org/WAI/ARIA/apg/patterns/meter/#:~:text=Not%20applicable.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-The%20element%20serving).

## Table of Contents

- [Usage](#usage)
- [Other Examples](#other-examples)
- [Composition](#composition)
- [Props](#props)
  - [`MeterOptions`](#meteroptions)
  - [`MeterStateProps`](#meterstateprops)

## Usage

```js
import * as React from "react";

import { Meter, useMeterState } from "@adaptui/react";

export const MeterBasic = props => {
  const state = useMeterState({
    value: 5,
    min: 0,
    max: 10,
    low: 0,
    high: 10,
    optimum: 5,
    ...props,
  });
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

[![Edit CodeSandbox](https://img.shields.io/badge/Meter%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/z9m7w0)
[![Edit CodeSandbox](https://img.shields.io/badge/Meter%20Basic%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/sjd6go)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Meter%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/1dpgzo)
[![Edit CodeSandbox](https://img.shields.io/badge/Meter%20Styled%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/4v89rm)

## Composition

- Meter uses `Role`
- useMeterState uses its own state

## Props

### `MeterOptions`

| Name        | Type                    | Description                                  |
| :---------- | :---------------------- | :------------------------------------------- |
| **`state`** | <code>MeterState</code> | Object returned by the `useMeterState` hook. |

### `MeterStateProps`

| Name          | Type                | Description                                                                                        |
| :------------ | :------------------ | :------------------------------------------------------------------------------------------------- |
| **`value`**   | <code>number</code> | The `value` of the meter indicator.If `undefined`/`not valid` the meter bar will be equal to `min` |
| **`min`**     | <code>number</code> | The minimum value of the meter                                                                     |
| **`max`**     | <code>number</code> | The maximum value of the meter                                                                     |
| **`low`**     | <code>number</code> | The higher limit of min range.Defaults to `min`.                                                   |
| **`optimum`** | <code>number</code> | The lower limit of max range.Defaults to `median of low & high`.                                   |
| **`high`**    | <code>number</code> | The lower limit of max range.Defaults to `max`.                                                    |
