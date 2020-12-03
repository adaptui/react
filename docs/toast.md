# Toast

`Toast` component provides a way to add notifications to the app with complete
freedom of styling them. It follows
[WAI-ARIA Alert Patter](https://www.w3.org/TR/wai-aria-practices-1.2/#alert) for
the
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-0)

## Usage

```js
import React from "react";
import { ToastProvider } from "renderless-components";

import { Variants, Placements } from "./Utils.component";

export const App = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      toastTypes={{
        error: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#f02c2d" }}>
              {content} <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
        success: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#01c24e" }}>
              {content} <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
        warning: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#ef5013" }}>
              {content} <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
      }}
    >
      <Variants />
      <br />
      <Placements />
    </ToastProvider>
  );
};

export default App;
```

[Toast CSS Animated - Open On Sandbox](https://codesandbox.io/s/5ybs5)

[Toast - Open On Sandbox](https://codesandbox.io/s/m3ems)
