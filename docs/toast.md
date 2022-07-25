# Toast

`Toast` component provides a way to add notifications to the app with complete
freedom of styling them. It follows
[WAI-ARIA Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) for
the
[accessibility properties](https://www.w3.org/WAI/ARIA/apg/patterns/alert/#:~:text=Not%20applicable.-,WAI%2DARIA%20Roles%2C%20States%2C%20and%20Properties,-The%20widget%20has).

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
          Add Manual Dismissable Toast
        </TriggerButton>
      </div>
    </div>
  );
}
```

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Basic-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/iycs9j)
[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20Basic%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/weyfsx)

## Other Examples

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Animated-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/9i4sog)
[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Animated%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/yqb6ns)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Transition-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/lxncv6)
[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20CSS%20Transition%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/3s2tfx)

[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20React%20Spring-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/2cwj06)
[![Edit CodeSandbox](https://img.shields.io/badge/Toast%20React%20Spring%20TS-Open%20On%20CodeSandbox-%230971f1?style=for-the-badge&logo=codesandbox&labelColor=151515)](https://codesandbox.io/s/b0quuk)

## Props

### `DefaultToastOptions`

| Name                    | Type                   | Description |
| :---------------------- | :--------------------- | :---------- |
| **`animationDuration`** | <code>number</code>    |             |
| **`children`**          | <code>ReactNode</code> |             |

### `DefaultToastProviderOptions`

<details><summary>DefaultToastOptions props</summary>
> These props are returned by the other props You can also provide these props.

| Name                    | Type                   | Description |
| :---------------------- | :--------------------- | :---------- |
| **`animationDuration`** | <code>number</code>    |             |
| **`children`**          | <code>ReactNode</code> |             |

</details>

### `ConfigurableToastOptions`

| Name               | Type                 | Description |
| :----------------- | :------------------- | :---------- |
| **`id`**           | <code>string</code>  |             |
| **`reverseOrder`** | <code>boolean</code> |             |

### `ToastOptions`

<details><summary>ConfigurableToastOptions props</summary>
> These props are returned by the other props You can also provide these props.

| Name                    | Type                   | Description |
| :---------------------- | :--------------------- | :---------- |
| **`id`**                | <code>string</code>    |             |
| **`reverseOrder`**      | <code>boolean</code>   |             |
| **`animationDuration`** | <code>number</code>    |             |
| **`children`**          | <code>ReactNode</code> |             |

</details>
