import * as React from "react";
import { objectKeys } from "@chakra-ui/utils";
import { animated, useTransition } from "react-spring";

import {
  Alert,
  ToastContainer,
  TriggerButton,
  getRandomContent,
  getRandomType,
  getPlacementSortedToasts,
  getRandomPlacement,
} from "./Utils.component";
import { ToastProvider, useToasts, useToasters, Toast } from "../index";

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
                <SpringAnimationWrapper key={toast.id} toast={toast}>
                  <Alert
                    toast={toast}
                    hideToast={dismissToast}
                    onMouseEnter={() => startPause(toast.id)}
                    onMouseLeave={() => endPause(toast.id)}
                  ></Alert>
                </SpringAnimationWrapper>
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
        Add Spring Animated Toast
      </TriggerButton>
    </div>
  );
}

const SpringAnimationWrapper: React.FC<{ toast: Toast }> = props => {
  const {
    toast: { placement = "bottom-right", visible },
    children,
  } = props;
  const translate = getTransform(placement, 50);
  const transitions = useTransition(visible, null, {
    from: { opacity: 0, maxHeight: 0, transform: translate.from },
    enter: {
      opacity: 1,
      maxHeight: 200,
      transform: translate.enter,
    },
    leave: { opacity: 0, maxHeight: 0, transform: translate.leave },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props} key={key}>
              {children}
            </animated.div>
          ),
      )}
    </>
  );
};

// Animation util
export const getTransform = (placement: string, pixels: number) => {
  const pos = { from: "", enter: "", leave: "" };
  pos.enter = `translate(0, 0)`;

  if (placement === "bottom-center") {
    pos.from = `translate(0, ${pixels}px)`;
    pos.leave = `translate(0, ${pixels}px)`;
    return pos;
  }
  if (placement === "top-center") {
    pos.from = `translate(0, ${-pixels}px)`;
    pos.leave = `translate(0, ${-pixels}px)`;
    return pos;
  }
  if (["bottom-left", "top-left"].includes(placement)) {
    pos.from = `translate(${-pixels}px, 0)`;
    pos.leave = `translate(${-pixels}px, 0)`;
    return pos;
  }
  if (["bottom-right", "top-right"].includes(placement)) {
    pos.from = `translate(${pixels}px, 0)`;
    pos.leave = `translate(${pixels}px, 0)`;
    return pos;
  }

  return pos;
};
