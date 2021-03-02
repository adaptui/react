import * as React from "react";
import { objectKeys } from "@chakra-ui/utils";
import { CSSTransition } from "react-transition-group";

import {
  Alert,
  TriggerButton,
  getRandomType,
  ToastContainer,
  AlertIndicator,
  getRandomContent,
  getPlacementSortedToasts,
} from "./Utils.component";
import { ToastProvider, useToasts, useToasters } from "../index";

export const App = () => {
  return (
    <ToastProvider animationDuration={300}>
      <Notifications />
      <ToastTriggers />
    </ToastProvider>
  );
};

export default App;

export const Notifications = () => {
  const { toasts, startPause, endPause, dismissToast } = useToasts();
  const sortedToasts = getPlacementSortedToasts(toasts);

  return (
    <>
      {objectKeys(sortedToasts).map(placement => {
        const toastsList = sortedToasts[placement];

        return (
          <ToastContainer key={placement} placement={placement}>
            {toastsList.map(toast => {
              return (
                <CSSTransition
                  key={toast.id}
                  in={toast.visible}
                  classNames="alert"
                  timeout={300}
                  mountOnEnter
                >
                  <Alert
                    toast={toast}
                    hideToast={dismissToast}
                    onMouseEnter={() => startPause(toast.id)}
                    onMouseLeave={() => endPause(toast.id)}
                  >
                    <AlertIndicator toast={toast} />
                  </Alert>
                </CSSTransition>
              );
            })}
          </ToastContainer>
        );
      })}
    </>
  );
};

export function ToastTriggers() {
  const { showToast } = useToasters();

  return (
    <div className="space-x-2">
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "top-left",
          })
        }
      >
        Add Top Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "top-center",
          })
        }
      >
        Add Top Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "top-right",
          })
        }
      >
        Add Top Right Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "bottom-left",
            reverseOrder: true,
          })
        }
      >
        Add Bottom Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "bottom-center",
            reverseOrder: true,
          })
        }
      >
        Add Bottom Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
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
