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
import { css, keyframes } from "@emotion/css";

import { Meter, useMeterState } from "@renderlesskit/react";

export const App = props => {
  const {
    children,
    withLabel = false,
    withStripe = false,
    withStripeAnimation = false,
    ...rest
  } = props;
  const meter = useMeterState(rest);

  return (
    <div className={meterStyle}>
      <Meter
        className={meterBarStyle(meter, props)}
        aria-label="meter"
        {...meter}
        {...rest}
      ></Meter>
      {withLabel && <div className={labelStyles}>{`${meter.percent}%`}</div>}
    </div>
  );
};

export default App;

const meterStyle = css({
  position: "relative",
  width: "500px",
  height: "1rem",
  background: "whiteSmoke",
  borderRadius: "3px",
  border: "1px solid #ccc",
  boxShadow: "0 5px 5px -5px #333 inset",
  overflow: "hidden",
});

const labelStyles = css({
  top: "50%",
  left: "50%",
  width: "100%",
  textAlign: "center",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  fontWeight: "bold",
  fontSize: "0.75em",
  lineHeight: 1,
});

const stripeAnim = keyframes({
  from: { backgroundPosition: "1rem 0" },
  to: { backgroundPosition: "0 0" },
});

const background = {
  safe: "#8bcf69",
  caution: "#e6d450",
  danger: "#f28f68",
};

const generateStripe = {
  backgroundImage: `linear-gradient(
  45deg,
  rgba(255, 255, 255, 0.15) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, 0.15) 50%,
  rgba(255, 255, 255, 0.15) 75%,
  transparent 75%,
  transparent
)`,
  backgroundSize: "1rem 1rem",
};

function meterBarStyle(meter, props) {
  const { percent, status } = meter;
  const { withStripe, withStripeAnimation } = props;

  return css({
    backgroundColor: status == null ? undefined : background[status],
    width: percent != null ? `${percent}%` : 0,
    height: "100%",
    ...(withStripe && { ...generateStripe }),
    ...(withStripe &&
      withStripeAnimation && { animation: `${stripeAnim} 1s linear infinite` }),
  });
}
```

[Meter - Open On Sandbox](https://codesandbox.io/s/8mxwv)

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

- **`value`** <code>number</code> The `value` of the meter indicator.

  If `undefined`/`not valid` the meter bar will be equal to `min`

- **`min`** <code>number</code> The minimum value of the meter
- **`max`** <code>number</code> The maximum value of the meter
- **`low`** <code>number</code> The higher limit of min range.

  Defaults to `min`.

- **`optimum`** <code>number</code> The lower limit of max range.

  Defaults to `median of low & high`.

- **`high`** <code>number</code> The lower limit of max range.

  Defaults to `max`.

### `Meter`

<details><summary>4 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

- **`value`** <code>number</code> The `value` of the meter indicator.

  If `undefined`/`not valid` the meter bar will be equal to `min`

- **`min`** <code>number</code> The minimum value of the meter
- **`max`** <code>number</code> The maximum value of the meter
- **`percent`** <code>number</code> Percentage of the value progressed with
  respect to min & max

</details>
