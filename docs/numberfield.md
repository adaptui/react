# NumberField

`NumberField` component is a form element used to select a number while
following the keyboard interactions & accessibility properties like the
[Native Number Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
It follows
[WAI-ARIA Spin Button Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton)
for the accessibility features.

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)

## Usage

```js
import * as React from "react";
import { useLocale } from "@react-aria/i18n";

import {
  NumberFieldDecrementButton,
  NumberFieldGroup,
  NumberFieldIncrementButton,
  NumberFieldInput,
  NumberFieldLabel,
  useNumberFieldBaseState,
  useNumberFieldState,
} from "@adaptui/react";

export const NumberFieldBasic = props => {
  let { locale } = useLocale();
  const baseState = useNumberFieldBaseState({ ...props, locale });
  const state = useNumberFieldState({ ...props, state: baseState });

  return (
    <div>
      <NumberFieldLabel state={state}>NumberField</NumberFieldLabel>
      <NumberFieldGroup state={state}>
        <NumberFieldDecrementButton state={state}>-</NumberFieldDecrementButton>
        <NumberFieldInput state={state} />
        <NumberFieldIncrementButton state={state}>+</NumberFieldIncrementButton>
      </NumberFieldGroup>
    </div>
  );
};

export default NumberFieldBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/NumberField-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/nwj5vb)

## Accessibility Requirement

- `NumberField` should have `aria-label` or `aria-labelledby` attribute.

## Composition

- NumberFieldDecrementButton uses
- NumberFieldGroup uses
- NumberFieldIncrementButton uses
- NumberFieldInput uses
- NumberFieldLabel uses

<!-- ADD_PROPS src/numberfield -->
