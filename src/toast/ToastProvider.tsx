import React from "react";
import ReactDOM from "react-dom";
import { canUseDOM } from "reakit-utils";
import { objectKeys } from "@chakra-ui/utils";

import { isFunction } from "../utils";
import { Toast, useToastState, ToastStateReturn } from "./ToastState";

const DEFAULT_TIMEOUT = 5000;
const DEFAULT_PLACEMENTS: Record<string, React.CSSProperties> = {
  "top-left": {
    position: "fixed",
    top: 0,
    left: 0,
  },
  "top-center": {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "top-right": {
    position: "fixed",
    top: 0,
    right: 0,
  },
  "bottom-left": {
    position: "fixed",
    bottom: 0,
    left: 0,
  },
  "bottom-center": {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-right": {
    position: "fixed",
    bottom: 0,
    right: 0,
  },
};

// let's infer the union types from the placement values instead of hardcoding them
export type ToastPlacements = keyof typeof DEFAULT_PLACEMENTS;

export interface ToastContextState extends ToastStateReturn {
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
    Pick<Toast, "id" | "isVisible"> & {
      index: number;
      toastsLength?: number;
      content: any;
      hideToast: ToastStateReturn["hideToast"];
    }
  >
>;

export type ToastContainer = (
  props: React.PropsWithChildren<{
    placement: ToastPlacements;
  }>,
) => any;

export type ToastWrapper = (
  props: React.PropsWithChildren<{
    index: number;
    placement: ToastPlacements;
    isVisible?: boolean;
    timeout?: number;
    autoDismiss?: boolean;
    toastId?: string;
    toastsLength?: number;
  }>,
) => any;

export type ToastProviderProps = {
  /**
   * Specify types of toast in an object
   */
  toastTypes: ToastTypes;
  /**
   * Placement of the toast on the screen
   *
   * @default "bottom-center"
   */
  placement?: ToastPlacements;
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
  toastContainer?: ToastContainer;
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
  toastContainer: ToastContainerComponent = ({ children }) => children,
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
    const toastsLength = toastsList.length;

    return (
      <ToastContainerComponent key={placement} placement={placement}>
        {toastsList.map((toast, index) => {
          const { id, type, content, timeout, autoDismiss, isVisible } = toast;

          return (
            <ToastWrapperComponent
              key={`${placement}-${id}`}
              toastId={id}
              index={index}
              isVisible={isVisible}
              placement={placement}
              toastsLength={toastsLength}
              timeout={timeout ?? providerTimeout}
              autoDismiss={autoDismiss ?? providerAutoDismiss}
            >
              {isFunction(content)
                ? content({ index, id, isVisible, hideToast })
                : toastTypes[type]?.({
                    index,
                    id,
                    content,
                    toastsLength,
                    isVisible,
                    hideToast,
                  }) || content}
            </ToastWrapperComponent>
          );
        })}
      </ToastContainerComponent>
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
