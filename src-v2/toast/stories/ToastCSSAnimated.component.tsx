import * as React from "react";

import {
  Alert,
  AlertIndicator,
  AlertType,
  ContentType,
  getRandomContent,
  getRandomType,
  ToastBar,
  ToastProvider,
  ToastWrapper,
  TriggerButton,
  useToastHandlers,
} from "./Utils.component";

export const Toast = () => {
  return (
    <ToastProvider animationDuration={300}>
      <ToastBar />
      <ToastTriggers />
    </ToastProvider>
  );
};

export default Toast;

const alert =
  (content: any, type?: AlertType) =>
  ({ toast, handlers }: ContentType) => {
    const { pauseTimer, resumeTimer, dismissToast } = handlers;

    return (
      <ToastWrapper toast={toast}>
        <Alert
          toast={toast}
          type={type}
          hideToast={dismissToast}
          content={content}
          onMouseEnter={() => pauseTimer(toast.id)}
          onMouseLeave={() => resumeTimer(toast.id)}
        >
          <AlertIndicator toast={toast} type={type} />
        </Alert>
      </ToastWrapper>
    );
  };

export function ToastTriggers() {
  const { showToast } = useToastHandlers();

  return (
    <div className="space-x-2">
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "top-left",
            autoDismiss: true,
            dismissDuration: 1000,
          })
        }
      >
        Add 1s duration Top Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "top-center",
            autoDismiss: true,
            dismissDuration: 2000,
          })
        }
      >
        Add 2s duration Top Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "top-right",
            autoDismiss: true,
            dismissDuration: 3000,
          })
        }
      >
        Add 3s duration Top Right Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "bottom-left",
            autoDismiss: true,
            dismissDuration: 4000,
          })
        }
      >
        Add 4s duration Top Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "bottom-center",
            autoDismiss: true,
            dismissDuration: 5000,
          })
        }
      >
        Add 5s duration Bottom Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "bottom-right",
            autoDismiss: false,
          })
        }
      >
        Add Non Dismissable Bottom Right Toast
      </TriggerButton>
    </div>
  );
}
