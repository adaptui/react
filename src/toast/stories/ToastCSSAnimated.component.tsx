import * as React from "react";
import { objectKeys } from "@chakra-ui/utils";

import {
  Alert,
  ToastContainer,
  TriggerButton,
  getRandomContent,
  getRandomType,
  getPlacementSortedToasts,
  getRandomPlacement,
  ToastWrapper,
  AlertIndicator,
} from "./Utils.component";
import { ToastProvider, useToasts, useToasters } from "../index";

export const App = () => {
  return (
    <ToastProvider>
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
                <ToastWrapper key={toast.id} toast={toast}>
                  <Alert
                    toast={toast}
                    hideToast={dismissToast}
                    onMouseEnter={() => startPause(toast.id)}
                    onMouseLeave={() => endPause(toast.id)}
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
            ...getRandomPlacement(),
            duration: 1000,
          })
        }
      >
        Add 1s duration Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            ...getRandomPlacement(),
            duration: 2000,
          })
        }
      >
        Add 2s duration Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            ...getRandomPlacement(),
            duration: 3000,
          })
        }
      >
        Add 3s duration Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            ...getRandomPlacement(),
            duration: 4000,
          })
        }
      >
        Add 4s duration Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            ...getRandomPlacement(),
          })
        }
      >
        Add 5s duration Toast
      </TriggerButton>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            ...getRandomPlacement(),
            duration: Infinity,
          })
        }
      >
        Add Non Dismissable Toast
      </TriggerButton>
    </div>
  );
}
