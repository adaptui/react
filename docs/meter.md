# Meter

`Meter` component can be used to provide a graphical display of a numeric value
that varies within a defined range. It follows the
[WAI-ARIA Meter Pattern](https://w3c.github.io/aria-practices/#meter) for it's
[accessibility properties](https://w3c.github.io/aria-practices/#wai-aria-roles-states-and-properties-15)

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`useMeterState`](#usemeterstate)
  - [`Meter`](#meter)

## Usage

```js
import * as React from "react";

import { Meter, useMeterState } from "@renderlesskit/react";

export const App = props => {
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
        {...state}
      ></Meter>
    </div>
  );
};

export default App;

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};
```

[Meter Basic- Open On Sandbox](https://codesandbox.io/s/49dsv)

[Meter Styled - Open On Sandbox](https://codesandbox.io/s/6b6s7)

## Accessibility Requirement

- `Meter` should have `aria-label` or `aria-labelledby` attribute.
- `Meter` should not be used to represent a value like the current world
  population since it does not have a meaningful maximum limit.
- `Meter` should not be used to indicate progress, such as loading or percent
  completion of a task. To communicate progress, use the progressbar role
  instead.

## Composition

- Meter uses [useRole](https://reakit.io/docs/role)

## Props

### `useMeterState`

| Name        | Type                | Description                         |
| :---------- | :------------------ | :---------------------------------- |
| **`value`** | <code>number</code> | The `value` of the meter indicator. |

If `undefined`/`not valid` the meter bar will be equal to `min` | | **`min`** |
<code>number</code> | The minimum value of the meter | | **`max`** |
<code>number</code> | The maximum value of the meter | | **`low`** |
<code>number</code> | The higher limit of min range.

Defaults to `min`. | | **`optimum`** | <code>number</code> | The lower limit of
max range.

Defaults to `median of low & high`. | | **`high`** | <code>number</code> | The
lower limit of max range.

Defaults to `max`. |

### `Meter`

<details><summary>4 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name        | Type                | Description                         |
| :---------- | :------------------ | :---------------------------------- |
| **`value`** | <code>number</code> | The `value` of the meter indicator. |

If `undefined`/`not valid` the meter bar will be equal to `min` | | **`min`** |
<code>number</code> | The minimum value of the meter | | **`max`** |
<code>number</code> | The maximum value of the meter | | **`percent`** |
<code>number</code> | Percentage of the value progressed with respect to min &
max |

</details>
