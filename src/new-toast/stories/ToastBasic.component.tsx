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
} from "./Utils.component";
import { ToastProvider, useToasts, useToasters } from "../index";

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <Notifications />
      <ToastTriggers />
    </ToastProvider>
  );
};

export default App;

export const Notifications = () => {
  const { toasts, startPause, endPause } = useToasts();
  const { removeToast } = useToasters();

  const sortedToasts = getPlacementSortedToasts(toasts);

  return (
    <>
      {objectKeys(sortedToasts).map(placement => {
        const toastsList = sortedToasts[placement];

        return (
          <ToastContainer key={placement} placement={placement}>
            {toastsList.map((toast: any) => {
              console.log("%c toast", "color: #7f7700", toast.time);
              return (
                <Alert
                  key={toast.id}
                  toast={toast}
                  hideToast={removeToast}
                  onMouseEnter={() => startPause(toast.id)}
                  onMouseLeave={() => endPause(toast.id)}
                />
              );
            })}
          </ToastContainer>
        );
      })}
    </>
  );
};

export function ToastTriggers(props: any) {
  const { addToast, removeToast } = useToasters();

  return (
    <div className="space-y-2">
      <div className="space-x-2" {...props}>
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
      <div className="space-x-2" {...props}>
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
      <div className="space-x-2" {...props}>
        <TriggerButton
          onClick={() =>
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
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
            addToast(getRandomContent(), {
              type: getRandomType(),
              ...getRandomPlacement(),
              duration: 5000,
            })
          }
        >
          Add 5s duration Toast
        </TriggerButton>
      </div>
    </div>
  );
}
