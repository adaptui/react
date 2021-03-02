import * as React from "react";
import { objectKeys } from "@chakra-ui/utils";

import {
  Alert,
  ToastWrapper,
  TriggerButton,
  getRandomType,
  AlertIndicator,
  ToastContainer,
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
  const { toasts, pauseTimer, resumeTimer, dismissToast } = useToasts();
  const sortedToasts = getPlacementSortedToasts(toasts);

  return (
    <>
      {objectKeys(sortedToasts).map(placement => {
        const toastsList = sortedToasts[placement];

        return (
          <ToastContainer key={placement} placement={placement}>
            {toastsList.map(toast => {
              return (
                <ToastWrapper key={toast.id} toast={toast}>
                  <Alert
                    toast={toast}
                    hideToast={dismissToast}
                    onMouseEnter={() => pauseTimer(toast.id)}
                    onMouseLeave={() => resumeTimer(toast.id)}
                  >
                    <AlertIndicator toast={toast} />
                  </Alert>
                </ToastWrapper>
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
            dismissDuration: 1000,
          })
        }
      >
        Add 1s duration Top Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "top-center",
            dismissDuration: 2000,
          })
        }
      >
        Add 2s duration Top Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "top-right",
            dismissDuration: 3000,
          })
        }
      >
        Add 3s duration Top Right Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "bottom-left",
            dismissDuration: 4000,
          })
        }
      >
        Add 4s duration Top Left Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            placement: "bottom-center",
          })
        }
      >
        Add 5s duration Bottom Center Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
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
