## Link

Accessible `Link` component that provides the required aria role when used under
different compositions. It follows the
[WAI-ARIA Link Pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#link).

# Props

<!-- Automatically generated -->

### `Link`

- **`disabled`** <code>boolean | undefined</code> Same as the HTML attribute.
- **`focusable`** <code>boolean | undefined</code> When an element is
  `disabled`, it may still be `focusable`. It works similarly to `readOnly` on
  form elements. In this case, only `aria-disabled` will be set.
- **`isExternal`** <code>boolean | undefined</code> Opens the link in a new tab

### Accessibilty

- `Link` has role `link`.

### Composition

- `Link` uses
  [Clickable](https://github.com/reakit/reakit/blob/master/docs/clickable)

### Example

```js
import * as React from "react";

import { Link } from "renderless-components";

export const App = props => {
  return <Link {...props}>Reakit</Link>;
};

export default App;
```
