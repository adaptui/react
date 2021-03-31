import * as React from "react";
import { CSSTransition } from "react-transition-group";

import {
  Alert,
  ToastBar,
  AlertType,
  ContentType,
  ToastProvider,
  TriggerButton,
  getRandomType,
  AlertIndicator,
  getRandomContent,
  useToastHandlers,
} from "./Utils.component";
import {} from "../index";

export const App = () => {
  return (
    <ToastProvider animationDuration={300}>
      <ToastBar />
      <ToastTriggers />
    </ToastProvider>
  );
};

export default App;

const alert = (content: any, type?: AlertType) => ({
  toast,
  handlers,
}: ContentType) => {
  const { pauseTimer, resumeTimer, dismissToast } = handlers;

  return (
    <CSSTransition
      in={toast.visible}
      classNames="alert"
      timeout={300}
      mountOnEnter
    >
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
    </CSSTransition>
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
          })
        }
      >
        Add Top Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "top-center",
          })
        }
      >
        Add Top Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "top-right",
          })
        }
      >
        Add Top Right Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "bottom-left",
            reverseOrder: true,
          })
        }
      >
        Add Bottom Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "bottom-center",
            reverseOrder: true,
          })
        }
      >
        Add Bottom Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(alert(getRandomContent(), getRandomType()), {
            placement: "bottom-right",
            reverseOrder: true,
          })
        }
      >
        Add Bottom Right Toast
      </TriggerButton>
    </div>
  );
}
