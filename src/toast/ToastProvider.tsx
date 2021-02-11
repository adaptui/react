import React from "react";
import ReactDOM from "react-dom";
import { canUseDOM } from "reakit-utils";
import { objectKeys } from "@chakra-ui/utils";

import { isFunction } from "../utils";
import { ToastController } from "./ToastController";
import { Toast, useToastState, ToastStateReturn } from "./ToastState";

const DEFAULT_TIMEOUT = 5000;
const PLACEMENTS = {
  "top-left": { top: 0, left: 0 },
  "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: 0, right: 0 },
  "bottom-left": { bottom: 0, left: 0 },
  "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 0, right: 0 },
};

// let's infer the union types from the placement values instead of hardcoding them
export type Placements = keyof typeof PLACEMENTS;

interface ToastContextState extends ToastStateReturn {
  toastTypes: ToastTypes;
}

const ToastContext = React.createContext<ToastContextState | undefined>(
  undefined,
);
export const ToastContextProvider = ToastContext.Provider;

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error(
      "The `useToasts` hook must be called from a descendent of the `ToastProvider`.",
    );
  }

  return context;
}

export type ToastTypes = Record<
  string,
  React.FC<
    Pick<Toast, "content" | "id" | "isVisible"> & {
      hideToast: ToastStateReturn["hideToast"];
    }
  >
>;

type ToastWrapper = (
  props: React.PropsWithChildren<{
    id: string;
    placement: Placements;
    isVisible?: boolean;
    index: number;
  }>,
) => any;

type ToastProviderProps = {
  /**
   * Specify types of toast in an object
   */
  toastTypes: ToastTypes;
  /**
   * Placement of the toast on the screen
   *
   * @default "bottom-center"
   */
  placement?: Placements;
  /**
   * If True the toast will automatically dismiss after the specified duration
   */
  autoDismiss?: boolean;
  /**
   * Timeout after the toast will be removed automatically if autoDismiss is true
   *
   * @default 5000
   */
  autoCloseTimeout?: number;
  /**
   * Duration of delay after the toast will be unmounted, so that animations can run
   *
   * @default 0
   */
  animationTimeout?: number;
  /**
   * Wrapper function to enhance the behaviour of ToastController
   */
  toastWrapper?: ToastWrapper;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  toastTypes,
  placement: providerPlacement = "bottom-center",
  animationTimeout,
  toastWrapper: ToastWrapperComponent = ({ children }) => children,
  autoDismiss: providerAutoDismiss,
  autoCloseTimeout: providerTimeout = DEFAULT_TIMEOUT,
}) => {
  const state = useToastState({
    defaultPlacement: providerPlacement,
    animationTimeout,
  });
  const { sortedToasts, hideToast } = state;

  const Toasts = objectKeys(sortedToasts).map(placement => {
    const toastsList = sortedToasts[placement];

    return (
      <div
        key={placement}
        className={`toast__container toast__container--${placement}`}
        style={{
          position: "fixed",
          ...PLACEMENTS[placement],
        }}
      >
        {toastsList.map((toast, index) => {
          const { id, type, content, timeout, autoDismiss, isVisible } = toast;

          return (
            <ToastWrapperComponent
              key={id}
              id={id}
              index={index}
              isVisible={isVisible}
              placement={placement}
            >
              <ToastController
                id={id}
                onRequestRemove={hideToast}
                duration={timeout ?? providerTimeout}
                autoDismiss={autoDismiss ?? providerAutoDismiss}
              >
                {isFunction(content)
                  ? content({ id, isVisible, hideToast })
                  : toastTypes[type]?.({
                      id,
                      content,
                      isVisible,
                      hideToast,
                    }) || content}
              </ToastController>
            </ToastWrapperComponent>
          );
        })}
      </div>
    );
  });

  const portalTarget = canUseDOM ? document.body : null;

  return (
    <ToastContextProvider value={{ ...state, toastTypes }}>
      {children}
      {portalTarget ? ReactDOM.createPortal(Toasts, portalTarget) : Toasts}
    </ToastContextProvider>
  );
};
