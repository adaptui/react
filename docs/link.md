# Link

Accessible `Link` component that provides the required aria role when used under
different compositions. It follows the
[WAI-ARIA Link Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#link) for
[keyboard interactions](https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-10)
and
[accessibilty properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-11)

## Table of Contents

- [Usage](#usage)

## Usage

```js
import * as React from "react";

import { Link } from "@adaptui/react";

export const LinkBasic = props => {
  return <Link {...props} />;
};

export default LinkBasic;
```

[![Edit CodeSandbox](https://img.shields.io/badge/Link-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/k74wwe)

## Composition

- Link uses `useCommand`

<!-- INJECT_PROPS src/link -->
