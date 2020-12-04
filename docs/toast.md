# Toast

`Toast` component provides a way to add notifications to the app with complete
freedom of styling them. It follows
[WAI-ARIA Alert Patter](https://www.w3.org/TR/wai-aria-practices-1.2/#alert) for
the
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-0)

## Usage

```js
import * as React from "react";

import { ToastProvider, useToast } from "@renderlesskit/react";

export const App = () => {
  return (
    <ToastProvider
      autoDismiss={true}
      placement="bottom-center"
      toastTypes={{
        success: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#01c24e" }}>
              <span style={{ padding: "0.5rem", color: "white" }}>
                {content}
              </span>
              <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
        error: ({ hideToast, content, id }) => {
          return (
            <div className="toast" style={{ backgroundColor: "#f02c2d" }}>
              <span style={{ padding: "0.5rem", color: "white" }}>
                {content}
              </span>
              <button onClick={() => hideToast(id)}>x</button>
            </div>
          );
        },
      }}
    >
      <ToastTriggers />
    </ToastProvider>
  );
};

export default App;

const ToastTriggers = () => {
  const { showToast } = useToast();

  return (
    <>
      <button
        onClick={() => {
          showToast({ type: "success", content: "Success" });
        }}
      >
        Notify Success
      </button>
      <button
        onClick={() => {
          showToast({
            type: "error",
            content: "Error",
            placement: "top-right",
          });
        }}
      >
        Notify Failure
      </button>
    </>
  );
};
```

[Toast Basic - Open On Sandbox](https://codesandbox.io/s/yf6i7)

[Toast CSS Animated - Open On Sandbox](https://codesandbox.io/s/i0emy)

[Toast React Spring - Open On Sandbox](https://codesandbox.io/s/2uhsj)
