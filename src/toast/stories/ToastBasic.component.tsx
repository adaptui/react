import * as React from "react";
import { objectKeys } from "@chakra-ui/utils";

import {
  Alert,
  TriggerButton,
  getRandomType,
  ToastContainer,
  AlertIndicator,
  getRandomContent,
  getRandomPlacement,
  getPlacementSortedToasts,
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

const Notifications = () => {
  const { toasts, pauseTimer, resumeTimer, removeToast } = useToasts();
  const sortedToasts = getPlacementSortedToasts(toasts);

  return (
    <>
      {objectKeys(sortedToasts).map(placement => {
        const toastsList = sortedToasts[placement];

        return (
          <ToastContainer key={placement} placement={placement}>
            {toastsList.map(toast => {
              return (
                <Alert
                  key={toast.id}
                  toast={toast}
                  hideToast={removeToast}
                  onMouseEnter={() => pauseTimer(toast.id)}
                  onMouseLeave={() => resumeTimer(toast.id)}
                >
                  <AlertIndicator toast={toast} />
                </Alert>
              );
            })}
          </ToastContainer>
        );
      })}
    </>
  );
};

function ToastTriggers() {
  const { addToast, removeToast } = useToasters();

  return (
    <div className="space-y-2">
      <div className="space-x-2">
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), { ...getRandomPlacement() })
          }
        >
          Add Info Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: "success",
              ...getRandomPlacement(),
            })
          }
        >
          Add success Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: "error",
              ...getRandomPlacement(),
            })
          }
        >
          Add error Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
              type: getRandomType(),
              placement: "top-left",
            })
          }
        >
          Add Top Left Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
              placement: "top-center",
            })
          }
        >
          Add Top Center Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
              placement: "top-right",
            })
          }
        >
          Add Top Right Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
              type: getRandomType(),
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
            addToast(getRandomContent(), {
              type: getRandomType(),
              ...getRandomPlacement(),
              dismissDuration: 1000,
            })
          }
        >
          Add 1s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
              ...getRandomPlacement(),
              dismissDuration: 2000,
            })
          }
        >
          Add 2s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
              ...getRandomPlacement(),
              dismissDuration: 3000,
            })
          }
        >
          Add 3s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
              ...getRandomPlacement(),
              dismissDuration: 4000,
            })
          }
        >
          Add 4s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
              ...getRandomPlacement(),
              dismissDuration: 5000,
            })
          }
        >
          Add 5s duration Toast
        </TriggerButton>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
              type: getRandomType(),
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
