import * as React from "react";

import {
  Alert,
  AlertIndicator,
  AlertType,
  ContentType,
  getRandomContent,
  getRandomPlacement,
  getRandomType,
  ToastBar,
  ToastProvider,
  TriggerButton,
  useToastHandlers,
} from "./Utils.component";

import "./ToastBasic.css";

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
  (content: any, type?: AlertType) =>
  ({ toast, handlers }: ContentType) => {
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
