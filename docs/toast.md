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
  AlertIndicator,
  getRandomContent,
  getRandomPlacement,
  getRandomType,
  ToastBar,
  ToastProvider,
  TriggerButton,
  useToastHandlers,
} from "./Utils.component";

export const Toast = () => {
  return (
    <ToastProvider>
      <ToastBar />
      <ToastTriggers />
    </ToastProvider>
  );
};

export default Toast;

const alert =
  (content, type) =>
  ({ toast, handlers }) => {
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

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/0zrue)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Animated-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/ohi1e)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Transition-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/g6mc8)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20React%20Spring-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/z762p)

## Props

### `DefaultToast`

| Name                    | Type                | Description |
| :---------------------- | :------------------ | :---------- |
| **`animationDuration`** | <code>number</code> |             |

### `DefaultToastProvider`

| Name                    | Type                | Description |
| :---------------------- | :------------------ | :---------- |
| **`animationDuration`** | <code>number</code> |             |

### `ConfigurableToast`

| Name                    | Type                 | Description |
| :---------------------- | :------------------- | :---------- |
| **`id`**                | <code>string</code>  |             |
| **`reverseOrder`**      | <code>boolean</code> |             |
| **`animationDuration`** | <code>number</code>  |             |

### `Toast`

| Name                    | Type                 | Description |
| :---------------------- | :------------------- | :---------- |
| **`id`**                | <code>string</code>  |             |
| **`reverseOrder`**      | <code>boolean</code> |             |
| **`animationDuration`** | <code>number</code>  |             |
