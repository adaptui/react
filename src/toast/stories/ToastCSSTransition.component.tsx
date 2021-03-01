import * as React from "react";
import { objectKeys } from "@chakra-ui/utils";
import { CSSTransition } from "react-transition-group";

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

export const App = () => {
  return (
    <ToastProvider duration={5000}>
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
                  timeout={10000}
                  mountOnEnter
                >
                  <Alert
                    toast={toast}
                    hideToast={dismissToast}
                    onMouseEnter={() => startPause(toast.id)}
                    onMouseLeave={() => endPause(toast.id)}
                  ></Alert>
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
    <div>
      <TriggerButton
        onClick={() =>
          showToast(getRandomContent(), {
            type: getRandomType(),
            ...getRandomPlacement(),
          })
        }
      >
        Add CSS Transition Toast
      </TriggerButton>
    </div>
  );
}
