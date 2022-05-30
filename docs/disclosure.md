# Disclosure

Accessible Disclosure component that controls visibility of a section of
content.. It follows the
[WAI-ARIA Disclosure Pattern](https://www.w3.org/TR/wai-aria-practices/#disclosure)
for it's
[accessibility properties](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-8).

## Table of Contents

- [Usage](#usage)
- [Accessibility Requirement](#accessibility-requirement)
- [Composition](#composition)
- [Props](#props)
  - [`useDisclosureState`](#usedisclosurestate)
  - [`DisclosureButton`](#disclosurebutton)
  - [`DisclosureContent`](#disclosurecontent)

## Usage

```js
import * as React from "react";

import {
  DisclosureButton,
  DisclosureContent,
  useDisclosureState,
} from "@adaptui/react";

export const Disclosure = props => {
  const [hasExpandStarted, setHasExpandStarted] = React.useState(false);

  const state = useDisclosureState({
    ...props,
    onExpandStart: () => setHasExpandStarted(true),
    onCollapseEnd: () => setHasExpandStarted(false),
  });

  return (
    <div>
      <DisclosureButton {...state}>Show More</DisclosureButton>
      <DisclosureContent
        style={{
          display: hasExpandStarted ? "flex" : "none",
          flexDirection: "column",
        }}
        {...state}
      >
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
        <span>Item 6</span>
      </DisclosureContent>
    </div>
  );
};
export default Disclosure;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Disclosure%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/d2c5j)

## Accessibility Requirement

- `DisclosureButton` extends the accessibility features of
  [Button](https://www.w3.org/TR/wai-aria-practices/#button).
- `DisclosureButton` has a value specified for `aria-controls `that refers to
  `DisclosureContent`.
- When `DisclosureContent` is visible, `DisclosureButton` is `aria-expanded` set
  to `true`.
- When `DisclosureContent` is hidden, `DisclosureButton` is set to `false`.

## Composition

- DisclosureButton uses [useReakitButton](undefined)
- DisclosureContent uses [useBox](https://reakit.io/docs/box)

## Props

### `useDisclosureState`

| Name                   | Type                                                        | Description                                                                                   |
| :--------------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **`baseId`**           | <code>string</code>                                         | ID that will serve as a base for all the items IDs.                                           |
| **`expanded`**         | <code>boolean</code>                                        | Whether it's expanded or not.                                                                 |
| **`direction`**        | <code>&#34;vertical&#34; \| &#34;horizontal&#34;</code>     | Direction of the transition.                                                                  |
| **`contentSize`**      | <code>number</code>                                         | Size of the content.                                                                          |
| **`easing`**           | <code>string</code>                                         | Transition Easing.                                                                            |
| **`duration`**         | <code>number \| undefined</code>                            | Duration of the transition.By default the duration is calculated based on the size of change. |
| **`onExpandStart`**    | <code>(() =&#62; void) \| undefined</code>                  | Callback called before the expand transition starts.                                          |
| **`onExpandEnd`**      | <code>(() =&#62; void) \| undefined</code>                  | Callback called after the expand transition ends.                                             |
| **`onCollapseStart`**  | <code>(() =&#62; void) \| undefined</code>                  | Callback called before the collapse transition starts.                                        |
| **`onCollapseEnd`**    | <code>(() =&#62; void) \| undefined</code>                  | Callback called after the collapse transition ends..                                          |
| **`defaultExpanded`**  | <code>boolean \| undefined</code>                           | Default uncontrolled state.                                                                   |
| **`onExpandedChange`** | <code>((expanded: boolean) =&#62; void) \| undefined</code> | controllable state callback.                                                                  |

### `DisclosureButton`

| Name            | Type                              | Description                                                                                                                                                  |
| :-------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**  | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`** | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |

<details><summary>3 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name           | Type                        | Description                                         |
| :------------- | :-------------------------- | :-------------------------------------------------- |
| **`expanded`** | <code>boolean</code>        | Whether it's expanded or not.                       |
| **`baseId`**   | <code>string</code>         | ID that will serve as a base for all the items IDs. |
| **`toggle`**   | <code>() =&#62; void</code> | Toggles the `expanded` state                        |

</details>

### `DisclosureContent`

<details><summary>10 state props</summary>
> These props are returned by the state hook. You can spread them into this component (`{...state}`) or pass them separately. You can also provide these props from your own state logic.

| Name                  | Type                                                    | Description                                                                                   |
| :-------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------- |
| **`expanded`**        | <code>boolean</code>                                    | Whether it's expanded or not.                                                                 |
| **`baseId`**          | <code>string</code>                                     | ID that will serve as a base for all the items IDs.                                           |
| **`direction`**       | <code>&#34;vertical&#34; \| &#34;horizontal&#34;</code> | Direction of the transition.                                                                  |
| **`contentSize`**     | <code>number</code>                                     | Size of the content.                                                                          |
| **`easing`**          | <code>string</code>                                     | Transition Easing.                                                                            |
| **`duration`**        | <code>number \| undefined</code>                        | Duration of the transition.By default the duration is calculated based on the size of change. |
| **`onExpandStart`**   | <code>(() =&#62; void) \| undefined</code>              | Callback called before the expand transition starts.                                          |
| **`onExpandEnd`**     | <code>(() =&#62; void) \| undefined</code>              | Callback called after the expand transition ends.                                             |
| **`onCollapseStart`** | <code>(() =&#62; void) \| undefined</code>              | Callback called before the collapse transition starts.                                        |
| **`onCollapseEnd`**   | <code>(() =&#62; void) \| undefined</code>              | Callback called after the collapse transition ends..                                          |

</details>
