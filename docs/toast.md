# Toast

`Toast` component provides a way to add notifications to the app with complete
freedom of styling them. It follows
[WAI-ARIA Alert Patter](https://www.w3.org/TR/wai-aria-practices-1.2/#alert) for
the
[accessibility properties](https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-0)

## Usage

```js
import * as React from "react";

import {
  Alert,
  ToastBar,
  ToastProvider,
  TriggerButton,
  getRandomType,
  AlertIndicator,
  getRandomContent,
  useToastHandlers,
  getRandomPlacement,
} from "./Utils.component";

export const App = () => {
  return (
    <ToastProvider>
      <ToastBar />
      <ToastTriggers />
    </ToastProvider>
  );
};

export default App;

const alert = (content, type) => ({ toast, handlers }) => {
  const { pauseTimer, resumeTimer, removeToast } = handlers;

  return (
    <Alert
      toast={toast}
      type={type}
      hideToast={removeToast}
      content={content}
      onMouseEnter={() => pauseTimer(toast.id)}
      onMouseLeave={() => resumeTimer(toast.id)}
    >
      <AlertIndicator toast={toast} type={type} />
    </Alert>
  );
};

function ToastTriggers() {
  const { addToast, removeToast } = useToastHandlers();

  return (
    <div className="space-y-2">
      <div className="space-x-2">
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent()), {
              ...getRandomPlacement(),
            })
          }
        >
          Add Info Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), "success"), {
              ...getRandomPlacement(),
            })
          }
        >
          Add success Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), "error"), {
              ...getRandomPlacement(),
            })
          }
        >
          Add error Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), "warning"), {
              type: "warning",
              ...getRandomPlacement(),
            })
          }
        >
          Add warning Toast
        </TriggerButton>
        <TriggerButton onClick={() => removeToast()}>
          Remove All Toast
        </TriggerButton>
      </div>
      <div className="space-x-2">
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              placement: "top-left",
            })
          }
        >
          Add Top Left Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              placement: "top-center",
            })
          }
        >
          Add Top Center Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              placement: "top-right",
            })
          }
        >
          Add Top Right Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              placement: "bottom-left",
              reverseOrder: true,
            })
          }
        >
          Add Bottom Left Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              placement: "bottom-center",
              reverseOrder: true,
            })
          }
        >
          Add Bottom Center Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              placement: "bottom-right",
              reverseOrder: true,
            })
          }
        >
          Add Bottom Right Toast
        </TriggerButton>
      </div>
      <div className="space-x-2">
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              ...getRandomPlacement(),
              autoDismiss: true,
              dismissDuration: 1000,
            })
          }
        >
          Add 1s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              ...getRandomPlacement(),
              autoDismiss: true,
              dismissDuration: 2000,
            })
          }
        >
          Add 2s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              ...getRandomPlacement(),
              autoDismiss: true,
              dismissDuration: 3000,
            })
          }
        >
          Add 3s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              ...getRandomPlacement(),
              autoDismiss: true,
              dismissDuration: 4000,
            })
          }
        >
          Add 4s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              ...getRandomPlacement(),
              autoDismiss: true,
              dismissDuration: 5000,
            })
          }
        >
          Add 5s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(alert(getRandomContent(), getRandomType()), {
              ...getRandomPlacement(),
              autoDismiss: false,
            })
          }
        >
          Add Non Dismissable Toast
        </TriggerButton>
      </div>
    </div>
  );
}
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

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/nd6zk)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Styled-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ws3ku)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Animated-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/k2qs6)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20React%20Spring-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/4b9ej)
