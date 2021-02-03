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

We can utilize the `toastWrapper` prop to add animations and other wrappers
around the toast.

Example:

```jsx
<ToastProvider
  animationTimeout={500}
  toastWrapper={({ id, isVisible, children }) => (
    <CSSTransition className="fadeIn" in={isVisible} timeout={500}>
      {children}
    </CSSTransition>
  )}
  toastTypes={{
    primary: ({ content }) => <span>{content}</span>,
  }}
>
  <ToastTriggers />
</ToastProvider>
```

We also have to add the `animationTimeout` inorder to specify a delay before
removing the toast from the state, this would ensure the CSS or any other
animations has the chance to finish without being interrupted.

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/yf6i7)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/1297l)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Animated-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/hmpn1)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20React%20Spring-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/vfobg)
