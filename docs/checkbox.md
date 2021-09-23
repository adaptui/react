# Checkbox

`Checkbox` component can be used as dual or tri-state toggle button regardless
of the type of the underlying element. It follows the
[WAI-ARIA Checkbox Pattern](https://www.w3.org/TR/wai-aria-practices/#checkbox)
for it's
[accessibility properties](https://w3c.github.io/aria-practices/#wai-aria-roles-states-and-properties-5).
By default, it renders the native `<input type="checkbox">`.

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`useCheckboxState`](#usecheckboxstate)
  - [`Checkbox`](#checkbox)

## Usage

```js
import * as React from "react";

import {
  Checkbox as RenderlesskitCheckbox,
  splitStateProps,
  USE_CHECKBOX_STATE_KEYS,
  useCheckboxState,
} from "@renderlesskit/react";

export const Checkbox = props => {
  const [stateProps, checkboxProps] = splitStateProps(
    props,
    USE_CHECKBOX_STATE_KEYS,
  );

  const state = useCheckboxState(stateProps);

  return <RenderlesskitCheckbox {...state} {...checkboxProps} />;
};

export default Checkbox;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Checkbox%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/vwt44)

## Accessibility Requirement

- Checkbox has role `checkbox`.
- When checked, Checkbox has `aria-checked` set to `true`.
- When not checked, Checkbox has `aria-checked` set to `false`.
- When partially checked, Checkbox has `aria-checked` set to `mixed`.
- When Checkbox is not rendered as a native input checkbox, Checkbox will add
  `role="checkbox"`

## Composition

- Checkbox uses [useClickable](https://reakit.io/docs/clickable)

## Props

### `useCheckboxState`

| Name                | Type                                                                                                                                                                                                   | Description                                              |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **`defaultState`**  | <code title="boolean \| &#34;indeterminate&#34; \| (string \| number)[] \| undefined">boolean \| &#34;indeterminate&#34; \| (string \| number)[]...</code>                                             | Default State of the Checkbox for uncontrolled Checkbox. |
| **`state`**         | <code title="boolean \| &#34;indeterminate&#34; \| (string \| number)[] \| undefined">boolean \| &#34;indeterminate&#34; \| (string \| number)[]...</code>                                             | State of the Checkbox for controlled Checkbox..          |
| **`onStateChange`** | <code title="Dispatch&#60;SetStateAction&#60;boolean \| &#34;indeterminate&#34; \| (string \| number)[]&#62;&#62; \| undefined">Dispatch&#60;SetStateAction&#60;boolean \| &#34;indeterminat...</code> | OnChange callback for controlled Checkbox.               |

### `Checkbox`

| Name            | Type                                       | Description                                                                                                                                                  |
| :-------------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code>          | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code>          | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |
| **`value`**     | <code>string \| number \| undefined</code> | Checkbox's value is going to be used when multiple checkboxes share thesame state. Checking a checkbox with value will add it to the statearray.             |
| **`checked`**   | <code>boolean \| undefined</code>          | Checkbox's checked state. If present, it's used instead of `state`.                                                                                          |

<details><summary>2 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name           | Type                                                                                                                                                                                     | Description                                                                                                                 |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **`state`**    | <code>boolean \| &#34;indeterminate&#34; \| (string \| number)[]</code>                                                                                                                  | Stores the state of the checkbox.If checkboxes that share this state have defined a `value` prop, it'sgoing to be an array. |
| **`setState`** | <code title="(value: SetStateAction&#60;boolean \| &#34;indeterminate&#34; \| (string \| number)[]&#62;) =&#62; void">(value: SetStateAction&#60;boolean \| &#34;indeterminate...</code> | Sets `state` for the checkbox.                                                                                              |

</details>
