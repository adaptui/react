# Link

Accessible `Link` component that provides the required aria role when used under
different compositions. It follows the
[WAI-ARIA Link Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#link) for
[keyboard interactions](https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-10)
and
[accessibilty properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-11)

## Table of Contents

- [Usage](#usage)
- [Composition](#composition)
- [Props](#props)
  - [`Link`](#link)

## Usage

```js
import * as React from "react";

import { Link } from "@renderlesskit/react";

export const App = props => {
  return <Link {...props}>Reakit</Link>;
};

export default App;
```

[Link - Open on Sandbox](https://codesandbox.io/s/seki2)

## Composition

- Link uses [useClickable](https://reakit.io/docs/clickable)

## Props

### `Link`

| Name             | Type                              | Description                                                                                                                                                  |
| :--------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`disabled`**   | <code>boolean \| undefined</code> | Same as the HTML attribute.                                                                                                                                  |
| **`focusable`**  | <code>boolean \| undefined</code> | When an element is `disabled`, it may still be `focusable`. It workssimilarly to `readOnly` on form elements. In this case, only`aria-disabled` will be set. |
| **`isExternal`** | <code>boolean \| undefined</code> | Opens the link in a new tab                                                                                                                                  |
